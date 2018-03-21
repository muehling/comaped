class ConceptMap < ApplicationRecord

  after_create :after_create

  belongs_to :survey
  has_many :concepts, dependent: :destroy
  has_many :links, dependent: :destroy
  has_many :versions, dependent: :destroy

  serialize :data, Hash           #Speichert Infos als Key/Value Paare. Feste Keys:
                                  #-background_color: Hintergrundfarbe einer Map


  def self.generate_slug
    Digest::SHA1.hexdigest(rand(36**8).to_s(36))[1..6].to_s
  end

  #Prepares a map using the information of the survey.
  #Effect: If the concepts are restricted, the allowed concepts are created.
  #        Otherwise, if a start map is given, the necessary concepts and links are created.
  #Returns: -
  def after_create
    self.data["background_color"] ="#f8f8f8"
    self.accesses ||= 0
    unless survey.concept_labels.blank?
      labels = survey.concept_labels.split(',').map{|s| s.strip}.uniq
      step = 2*Math::PI/labels.length
      count = 0
      labels.each do |c|
        concepts.build(label: c, data:{"x"=> (labels.length/5.0)*100*(Math.sin(count*step) + 1), "y"=> (labels.length/5.0)*100*(Math.cos(count*step) + 1), "color"=>"#dff0d8"}).save
        count = count + 1
      end

      save
    else
      unless survey.initial_map.blank?
        from_tgf(survey.initial_map)
      end
    end

    while self.code.nil? || self.code.blank? || Survey.where(code: self.code).exists? || (ConceptMap.where(code: self.code).exists? && ConceptMap.find_by_code(self.code) != self)
      self.code = ConceptMap.generate_slug
    end
    save
    reload
    versionize(DateTime.now)
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
  #Params:
  # date: Is stored as the versions create/modified date
  #Effect: Creates a new versions object that stores the current state
  #Returns: -
  def versionize(date)
    ver = self.versions.build(map: to_json)
    ver.created_at = date
    ver.save
    save
  end

  #Import data from aeither a ZIP file in the same format that to_zip creates, or a JSON file
  #Parameter:
  # file: Path to a file
  # code: Will be used as an initial code for the map. May be overwritten if importing from JSON.
  #Effect: The attributes of the survey are modified, if data points to a valid JSON representation. If data points to a ZIP file, import_zip is called.
  #Returns: true if the import succeeded, false if an error occurred
  def import_file(file, code)
    self.code = 'I_' + code
    save
    temp = file.path.split('.')
    type = temp[-1].downcase
    return from_json(File.read(file).encode('UTF-8', 'ISO-8859-1', :undefined => :replace, :replace => '_'), 'I_') if type == "json"
    return from_tgf(File.read(file).encode('UTF-8', 'ISO-8859-1', :undefined => :replace, :replace => '_')) if type == "tgf"
    return import_zip(file, '') if type == "zip"
  end

  #Imports concepts and associations based on a JSON representation of a concept map object
  #Params:
  # data: A JSON string
  # code_prefix: A string that is prepended before the code taken from the JSON data
  #Effect: The necessary concepts and associations are created, also the code is restored from the JSON data
  #Returns: true if the import succeeded, false if an error occurred
  def from_json(data, code_prefix)
    data =  data.encode('ISO-8859-1','UTF-8')
    vals = ActiveSupport::JSON.decode(data)
    dict = Hash.new
    self.code = code_prefix + (vals["code"] || '')
    save

    vals["concepts"].each do |c|
      if(!c["color"].nil?)
        t = self.concepts.build(label: c["label"], data:{"x"=> c["x"], "y"=> c["y"], "color"=>c["color"]})
      else
        t = self.concepts.build(label: c["label"], data:{"x"=> c["x"], "y"=> c["y"], "color"=>"#dff0d8"})
      end
      t.save
      t.reload
      dict[c["id"]] = t
    end
    vals["links"].each do |l|
      t = self.links.build(label: l["label"], start: dict[l["start_id"]], end: dict[l["end_id"]])
      t.save
    end
    return save
  end

  #Imports concepts and associations based on a TGF string
  #Params:
  # data: A string in TGF format
  #Effect: The necessary concepts and associations are created
  #Returns: true if the import succeeded, false if an error occurred
  def from_tgf(data)
    parts = data.split('#')
    if parts.nil?
      node_defs = data
      edge_defs = nil
    else
      node_defs = parts[0].encode('ISO-8859-1','UTF-8')
      edge_defs = parts[1]
    end
    dict = Hash.new
    unless node_defs.nil?
      step = 2*Math::PI/node_defs.lines.count
      count = 0
      puts node_defs
      node_defs.each_line do |line|
        l = line.split(' ', 2)
        unless (l[0].nil? || l[1].nil? || l[0].blank? || l[1].blank?)
          c = concepts.build(label: l[1].strip.encode('ISO-8859-1','UTF-8'), data:{"x"=> (node_defs.lines.count/5.0)*100*(Math.sin(count*step) + 1), "y"=> (node_defs.lines.count/5.0)*100*(Math.cos(count*step) + 1), "color"=>"#dff0d8"})
          c.save
          dict[l[0]] = c
          count = count + 1
        end
      end
    end
    unless edge_defs.nil?
      edge_defs.each_line do |line|
        l = line.split(' ', 3)
        unless (l[0].nil? || l[1].nil? || dict[l[0]].nil? || dict[l[1]].nil? || l[2].nil? || l[2].blank?)
          links.build(start: dict[l[0]], end: dict[l[1]], label: l[2].strip).save
        end
      end
    end
    return save
  end

  #Imports several versions of a concept map from a ZIP archive
  #Params:
  # file: Path to a ZIP file
  # prefix: A path that will be used as a prefix when looking for data in the zip file. Used when importing concept maps from a project's or surveys's export. If non-empty, must end with '/''
  #Effect: The necessary versions are created based upon the timestamp in the filename,
  #Returns: true if the import of all versions succeeded, false if an error occurred
  def import_zip(file, prefix)
    zip = Zip::File.open(file)
    toDo = zip.glob(prefix + '*.json') + zip.glob(prefix + '*.tgf')
    res = true
    pos = 0
    versions.clear
    versions.reload
    toDo.sort.each do |c|
      name = c.name.split('/')[-1]
      name ||= c.name
      type = name.split('.')[-1]
      if type == "json"
        res = res && from_json(c.get_input_stream.read.encode('UTF-8', 'ISO-8859-1', :undefined => :replace, :replace => '_'), 'I_')
      end
      if type == "tgf"
        res = res && from_tgf(c.get_input_stream.read.encode('UTF-8', 'ISO-8859-1', :undefined => :replace, :replace => '_'))
      end
      versionize(DateTime.parse(name.split('.')[0..-2].join(':')))
      if pos < toDo.size-1
        concepts.clear
        concepts.reload
        links.clear
        links.reload
      end
      pos = pos+1
    end
    return res
  end

  #Creates a JSON representation of the map
  #Params: -
  #Effect: -
  #Returns: JSON data of the concept map
  def to_json
    res = ""
    res = res + '{"id":' + self.id.to_s + ',"code":"' +self.code.to_s + '","concepts":['
    self.concepts.each_with_index do |concept,i|
      nextConcept = self.concepts[i+1]
      if(nextConcept.nil?)
        res = res + '{"id":' + concept.id.to_s + ',"label":"' + concept.label.to_s + '","x":"' +concept.data["x"].to_s + '","y":"' + concept.data["y"].to_s+ '","color":"' + concept.data["color"].to_s + '"}'
      else
        res = res + '{"id":' + concept.id.to_s + ',"label":"' + concept.label.to_s + '","x":"' +concept.data["x"].to_s + '","y":"' + concept.data["y"].to_s+ '","color":"' + concept.data["color"].to_s + '"},'
      end
    end
    res = res + '],"links":['
    self.links.each_with_index do |link, i|
      nextLink = self.links[i+1]
      if(nextLink.nil?)
        res = res +'{"id":' + link.id.to_s + ',"start_id":' + link.start_id.to_s + ',"end_id":' + link.end_id.to_s + ',"label":"' + link.label + '"}'
      else
        res = res +'{"id":' + link.id.to_s + ',"start_id":' + link.start_id.to_s + ',"end_id":' + link.end_id.to_s + ',"label":"' + link.label + '"},'
      end
    end
    res = res + "]}"
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
        zip.put_next_entry((prefix + v.created_at.strftime("%Y-%m-%d %H.%M.%S") + ".tgf").encode!('CP437', :undefined => :replace, :replace => '_'))
        zip.print v.to_tgf.encode!('ISO-8859-1', :undefined => :replace, :replace => '_')
      else
        zip.put_next_entry((prefix + v.created_at.strftime("%Y-%m-%d %H.%M.%S") + ".json").encode!('CP437', :undefined => :replace, :replace => '_'))
        zip.print v.map.encode!('ISO-8859-1', :undefined => :replace, :replace => '_')
      end
    end
  end

end
