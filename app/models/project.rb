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

  #Create a Zipfile of all maps of all surveys of this project
  #Parameter:
  # versions: If true, all versions of each map are included in the file
  #Effect: -
  #Returns: Path to a temporary Zip file
  def export_zip(versions)
    temp = Tempfile.new("CoMapEd")
    Zip::OutputStream.open(temp.path) do |zip|
      self.surveys.each do |survey|
        survey.export_stream(zip, versions)
      end
    end
    temp.close
    return temp.path
  end
end
