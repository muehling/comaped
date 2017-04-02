require 'zip'

class Project < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
  has_many :surveys, dependent: :destroy

  #Import data from a ZIP file in the same format that to_zip creates
  #Parameter:
  # data: The ZIP stream data
  #Effect: -
  #Returns: A new object created from the data in the ZIP, including all surveys and concept maps or nil if an error occurrs.
  def self.import_zip(data)
    zip = Zip::ImportStream(data)
    file = zip.glob('project.json').first
    project = Project.build(JSON.parse(file.get_input_stream.read))
    toDo = zip.glob('*/survey.json')..map{|m| m.name.split('/')[0]}
    toDo.each do |s|
      project.surveys.build(Survey.import_zip(data, s + '/'))
    end
    project.save
    return project
  end

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
