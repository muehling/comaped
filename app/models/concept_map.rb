class ConceptMap < ApplicationRecord

  after_create :after_create

  belongs_to :survey
  has_many :concepts, dependent: :destroy
  has_many :links, dependent: :destroy
  has_many :versions, dependent: :destroy

  def generate_slug
    Digest::SHA1.hexdigest(rand(36**8).to_s(36))[1..6]
  end

  #Prepares a map using the information of the survey.
  #Effect: If the concepts are restricted, the allowed concepts are created.
  #        Otherwise, if a start map is given, the necessary concepts and links are created.
  #Returns: -
  def after_create
    self.accesses ||= 0
    unless survey.concept_labels.blank?
      survey.concept_labels.split(',').each do |c|
        concepts.build(label: c).save
      end
      save
    else
      unless survey.initial_map.blank?
        parse_tgf(survey.initial_map)
      end
    end

    if self.code.blank?
      self.code = generate_slug
      while (ConceptMap.where(code: self.code).exists? || Survey.where(code: self.code).exists?)
        self.code = generate_slug
      end
      save
    end
    reload
  end

  #Retrieve a map by code or find an available survey and create a new map
  #Params:
  # code: Either a concept map slug or a survey code
  #Effect: If no map but a suitable survey is found, a new map will be created for this survey
  #Returns: The identified map or a newly created map or nil if neither map nor survey is found.
  def self.prepare_map(code)
    map = ConceptMap.find_by_code(code)  #Check if a map with the given code already exists
    survey = Survey.find_by_code(code)   #Check if a survey with the given code exists
    if map.nil? && !survey.nil? && survey.available     #No map, but availabe survey => create a new map
      map = survey.concept_maps.build
      map.save
    end
    return map
  end

  #Creates concepts and associations based on a TGF string
  #Params:
  # data: A string in TGF format
  #Effect: The necessary concepts and associations are created
  #Returns: -
  def parse_tgf(data)
    parts = data.split('#')
    if parts.nil?
      node_defs = data
      edge_defs = nil
    else
      node_defs = parts[0]
      edge_defs = parts[1]
    end
    hash = Hash.new
    unless node_defs.nil?
      node_defs.each_line do |line|
        l = line.split(' ', 2)
        unless (l[0].nil? || l[1].nil? || l[0].blank? || l[1].blank?)
          c = concepts.build(:label => l[1].strip!)
          c.save
          hash[l[0]] = c
        end
      end
    end
    unless edge_defs.nil?
      edge_defs.each_line do |line|
        l = line.split(' ', 3)
        unless (l[0].nil? || l[1].nil? || hash[l[0]].nil? || hash[l[1]].nil? || l[2].nil? || l[2].blank?)
          links.build(:start => hash[l[0]], :end => hash[l[1]], :label => l[2]).save
        end
      end
    end
    save
  end

  #Creates a JSON representation of the map
  #Params: -
  #Effect: -
  #Returns: JSON data of the concept map
  def to_json
    as_json(include: {concepts: {only: [:id, :label, :x, :y]}, links: {only: [:id, :label, :start_id, :end_id]}}, only: :id)
  end

  def versionize
    ver = self.versions.build(map: as_json)
    ver.save
    save
  end

end
