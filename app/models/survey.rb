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

  #Create a Zipfile of all maps of this survey
  #Parameter:
  # versions: If true, all versions of each map are included in the file
  #Effect: -
  #Returns: Path to a temporary Zip file
  def export_zip(versions)
    temp = Tempfile.new("CoMapEd")
    Zip::OutputStream.open(temp.path) do |zip|
      export_stream(zip, versions)
    end
    temp.close
    return temp.path
  end

  #Write all maps of this survey in an already open output stream
  # zip: A Zipfile that is already open for writing
  # versions: If true, all versions of each map are included in the file
  #Effect: The  survey data is added to the stream 'zip'
  #Returns: -
  def export_stream(zip, versions)
    self.concept_maps.each do |map|
      unless (versions)
        zip.put_next_entry("#{self.name}/#{map.code}.tgf".encode!('CP437', :undefined => :replace, :replace => '_'))
        zip.print map.export_tgf.encode!('ISO-8859-1', :undefined => :replace, :replace => '_')
      else
        map.export_stream(zip, "#{self.name}/")
      end
    end
  end

end
