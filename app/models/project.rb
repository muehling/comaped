require 'zip'

class Project < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
  has_many :surveys, dependent: :destroy

  #Collect all concept maps of this project
  #Parameter: -
  #Effect: -
  #Returns: Collection of all concept maps that belong to this project
  def concept_maps
    ConceptMap.where(:survey_id => surveys)
  end

  #Check if any of the projects' surveys are available
  #Parameter: -
  #Effect: -
  #Returns: true if at least one survey of the project is currently available
  def available
    surveys.each do |s|
      return true if s.available
    end
    return false
  end

  #Import data from either a ZIP file in the same format that to_zip creates, or a JSON file
  #Parameter:
  # file: Path to a file
  #Effect: The attributes of the project are modified, if data points to a valid JSON representation. If data points to a ZIP file, import_zip is called.
  #Returns: true if the import succeeded, false if an error occurred
  def import_file(file)
    temp = file.path.split('.')
    type = temp[temp.length-1].downcase
    return from_json(File.read(file), "(Import) ") if type == "json"
    return import_zip(file) if type == "zip"
  end

  #Set attributes from a JSON string
  #Parameter:
  # data: JSON data that represents a Project object
  # name_prefix: A string that is prepended before the name taken from the JSON data
  #Effect: The attributes of the project are modified.
  #Returns: true if the update succeeded, false if an error occurred
  def from_json(data, name_prefix)
    vals = ActiveSupport::JSON.decode(data)
    update_attributes(vals.slice("name", "description"))
    self.name = name_prefix + self.name
    return save
  end

  #Import data from a ZIP file in the same format that to_zip creates
  #Parameter:
  # file: Path to a ZIP file
  #Effect: The attributes of the project are modified, if a project.json file is found. Surveys are imported into the project if present
  #Returns: true if the import succeeded, false if an error occurred
  def import_zip(file)
    zip = Zip::File.open(file)
    f = zip.glob('project.json').first
    if f.nil? || !from_json(f.get_input_stream.read, "(Import) ")
      return false
    end
    toDo = zip.glob('*/survey.json').map{|m| m.name.split('/')[0]}
    toDo.each do |s|
      t = self.surveys.build
      unless t.import_zip(file, s + '/')
        return false
      end
    end
    return save
  end

  #Create a Zipfile of all maps of all surveys of this project. Also includes a JSON file with the project's attributes.
  #Parameter:
  # tgf: If true, the maps are exported in TGF format, JSON is used otherwise
  # versions: If true, all versions of each map are included in the file
  #Effect: -
  #Returns: Path to a temporary Zip file
  def to_zip(tgf, versions)
    temp = Tempfile.new("CoMapEd")
    Zip::OutputStream.open(temp.path) do |zip|
      zip.put_next_entry('project.json')
      zip.print self.as_json(only: [:name, :description]).to_json.encode!('ISO-8859-1', :undefined => :replace, :replace => '_')
      self.surveys.each do |survey|
        survey.write_stream(survey.name+"/", zip, tgf, versions)
      end
    end
    temp.close
    return temp.path
  end
end
