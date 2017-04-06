require 'zip'

class Survey < ApplicationRecord
  validates :name, presence: true
  validates :code, uniqueness: true, if: 'code.present?'

  belongs_to :project
  has_many :concept_maps, dependent: :destroy

  #Check if the survey is currently availaibe
  #Parameter:-
  #Effect: -
  #Returns: true if the survey is currently open for access
  def available
    return (start_date.nil? || start_date <= Date.today) && (end_date.nil? || Date.today <= self.end_date)
  end

  #Import data from either a ZIP file in the same format that to_zip creates, or a JSON file
  #Parameter:
  # file: Path to a file
  #Effect: The attributes of the survey are modified, if data points to a valid JSON representation. If data points to a ZIP file, import_zip is called.
  #Returns: true if the import succeeded, false if an error occurred
  def import_file(file)
    temp = file.path.split('.')
    type = temp[temp.length-1].downcase
    return from_json(File.read(file), "(Import) ") if type == "json"
    return import_zip(file, '') if type == "zip"
  end

  #Set attributes from a JSON string
  #Parameter:
  # data: JSON data that represents a Project object
  # name_prefix: A string that is prepended before the name taken from the JSON data
  #Effect: The attributes of the project are modified.
  #Returns: true if the update succeeded, false if an error occurred
  def from_json(data, name_prefix)
    vals = ActiveSupport::JSON.decode(data)
    update_attributes(vals.slice("name", "description", "introduction", "association_labels", "concept_labels", "initial_map"))
    self.name = name_prefix + self.name
    return save
  end

  #Import data from a ZIP file in the same format that to_zip creates
  #Parameter:
  # file: Path to a ZIP file
  # prefix: A path that will be used as a prefix when looking for data in the zip file. Used when importing surveys from a project's export. If non-empty, must end with '/''
  #Effect: The attributes of the survey are modified, if a survey.json file is found. Concept maps are imported into the project if present
  #Returns: true if the import succeeded, false if an error occurred
  def import_zip(file, prefix)
    zip = Zip::File.open(file)
    f = zip.glob(prefix + 'survey.json').first
    if f.nil? || !from_json(f.get_input_stream.read, "(Import) ")
      return false
    end

    files = zip.glob(prefix + '*.json') + zip.glob(prefix + '*.tgf')
    zip = zip.glob(prefix + '*/*.json') + zip.glob(prefix + '*/*.tgf')

    files.each do |f|
      parts = f.name.split('/')
      name = f.name
      name = parts[-1] unless parts.nil?
      if name != "survey.json"
        if name.split('.')[1] == 'tgf'
          map = self.concept_maps.build
          map.code = "I_" + name.split('.')[0]
          map.save
          map.from_tgf(f.get_input_stream.read)
        else
          if name.split('.')[1] == 'json'
            map = self.concept_maps.build
            map.from_json(f.get_input_stream.read, 'I_')
          end
        end
      end
    end

    zip.map{|f| f.name.split('/')[-2]}.uniq.each do |f|
      map = self.concept_maps.build
      map.code = "I_" + f
      map.save
      map.import_zip(file, prefix + f + '/')
    end

    return save
  end

  #Create a Zipfile of all maps of this survey. Also includes a JSON file with the surveys's attributes.
  #Parameter:
  # tgf: If true, the maps are exported in TGF format, JSON is used otherwise
  # versions: If true, all versions of each map are included in the file
  #Effect: -
  #Returns: Path to a temporary Zip file
  def to_zip(tgf, versions)
    temp = Tempfile.new("CoMapEd")
    Zip::OutputStream.open(temp.path) do |zip|
      write_stream('', zip, tgf, versions)
    end
    temp.close
    return temp.path
  end

  #Write all maps of this survey in an already open output stream. Also includes a JSON file with the survey's attributes.
  #Parameter:
  # prefix: A path that is appended before the survey data. Must end with / unless empty
  # zip: A Zipfile that is already open for writing
  # tgf: If true, the maps are exported in TGF format, JSON is used otherwise
  # versions: If true, all versions of each map are included in the file
  #Effect: The  survey data is added to the stream 'zip'
  #Returns: -
  def write_stream(prefix, zip, tgf, versions)
    zip.put_next_entry(prefix + 'survey.json')
    zip.print self.as_json(only: [:name, :description, :code, :introduction, :association_labels, :concept_labels, :initial_map, :start_date, :end_date]).to_json.encode!('ISO-8859-1', :undefined => :replace, :replace => '_')
    self.concept_maps.each do |map|
      if versions
        map.write_stream(prefix + map.code + "/", zip, tgf)
      else
        if tgf
          zip.put_next_entry((prefix + map.code + ".tgf").encode!('CP437', :undefined => :replace, :replace => '_'))
          zip.print map.to_tgf.encode!('ISO-8859-1', :undefined => :replace, :replace => '_')
        else
          zip.put_next_entry((prefix + map.code + ".json").encode!('CP437', :undefined => :replace, :replace => '_'))
          zip.print map.to_json.encode!('ISO-8859-1', :undefined => :replace, :replace => '_')
        end
      end
    end
  end

end
