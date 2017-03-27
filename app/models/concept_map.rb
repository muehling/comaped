class ConceptMap < ApplicationRecord

  after_create :after_create

  belongs_to :survey
  has_many :concepts, dependent: :destroy
  has_many :links, dependent: :destroy
  has_many :versions, dependent: :destroy

  def self.generate_slug
    Digest::SHA1.hexdigest(rand(36**8).to_s(36))[1..6]
  end

  #Prepares a map using the information of the survey.
  #Effect: If the concepts are restricted, the allowed concepts are created.
  #        Otherwise, if a start map is given, the necessary concepts and links are created.
  #Returns: -
  def after_create
    self.accesses ||= 0
    unless survey.concept_labels.blank?
      labels = survey.concept_labels.split(',')
      step = 2*Math::PI/labels.length
      count = 0
      labels.each do |c|
        concepts.build(label: c, x: (labels.length/5.0)*100*(Math.sin(count*step) + 1), y: (labels.length/5.0)*100*(Math.cos(count*step) + 1)).save
        count = count + 1
      end
      save
    else
      unless survey.initial_map.blank?
        parse_tgf(survey.initial_map)
      end
    end

    if self.code.blank?
      self.code = ConceptMap.generate_slug
      while (ConceptMap.where(code: self.code).exists? || Survey.where(code: self.code).exists?)
        self.code = ConceptMap.generate_slug
      end
      save
    end
    reload
    versionize
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

  #Saves a version of the current state
  #Params: -
  #Effect: Creates a new versions object that stores the current state
  #Returns: -
  def versionize
    ver = self.versions.build(map: to_json)
    ver.save
    save
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
      step = 2*Math::PI/node_defs.lines.count
      count = 0
      node_defs.each_line do |line|
        l = line.split(' ', 2)
        unless (l[0].nil? || l[1].nil? || l[0].blank? || l[1].blank?)
          c = concepts.build(label: l[1].strip, x: (node_defs.lines.count/5.0)*100*(Math.sin(count*step) + 1), y: (node_defs.lines.count/5.0)*100*(Math.cos(count*step) + 1))
          c.save
          hash[l[0]] = c
          count = count + 1
        end
      end
    end
    unless edge_defs.nil?
      edge_defs.each_line do |line|
        l = line.split(' ', 3)
        unless (l[0].nil? || l[1].nil? || hash[l[0]].nil? || hash[l[1]].nil? || l[2].nil? || l[2].blank?)
          links.build(start: hash[l[0]], end: hash[l[1]], label: l[2].strip).save
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
    as_json(include: {concepts: {only: [:id, :label, :x, :y]}, links: {only: [:id, :label, :start_id, :end_id]}}, only: :id).to_json
  end

  #Creates a TGF representation of the map
  #Params: -
  #Effect: -
  #Returns: TGF data of the concept map
  def to_tgf
    reload(:include => [:concepts, :links])
    res = ""
    self.concepts.each do |concept|
      res = res + concept.id.to_s + " " + concept.label + "\n"
    end
    res = res + "#\n"
    self.links.each do |edge|
      res = res + edge.start_id.to_s + " " + edge.end_id.to_s + " " + edge.label + "\n"
    end
    return res
  end

  #Creates a TGF or JSON representation of all versions of the map as a zip file
  #Params:
  # tgf: If true, the version will be exported to tgf format, json will be used otherwise
  #Effect: -
  #Returns: Path to a temporary Zip file
  def to_zip(tgf)
    temp = Tempfile.new("CoMapEd")
    Zip::OutputStream.open(temp.path) do |zip|
      write_stream('', zip, tgf)
    end
    temp.close
    return temp.path
  end

  #Creates a TGF or JSON representation of all versions of the map and writes to an already open zip file
  #Params:
  # prefix: A path that is appended before the survey data. Must end with /, unless empty
  # zip: A Zipfile that is already open for writing
  # tgf: If true, the version will be exported to tgf format, json will be used otherwise
  #Effect: The  concept map data is added to the stream 'zip'
  #Returns: -
  def write_stream(prefix, zip, tgf)
    self.versions.each do |v|
      if tgf
        zip.put_next_entry((prefix + v.created_at.strftime("%Y-%m-%d %H:%M") + ".tgf").encode!('CP437', :undefined => :replace, :replace => '_'))
        zip.print v.to_tgf.encode!('ISO-8859-1', :undefined => :replace, :replace => '_')
      else
        zip.put_next_entry((prefix + v.created_at.strftime("%Y-%m-%d %H:%M") + ".json").encode!('CP437', :undefined => :replace, :replace => '_'))
        zip.print v.map.encode!('ISO-8859-1', :undefined => :replace, :replace => '_')
      end
    end
  end

end
