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

  #Write all maps of this survey in an already open output stream
  #Parameter:
  # prefix: A path that is appended before the survey data. Must end with / unless empty
  # zip: A Zipfile that is already open for writing
  # tgf: If true, the maps are exported in TGF format, JSON is used otherwise
  # versions: If true, all versions of each map are included in the file
  #Effect: The  survey data is added to the stream 'zip'
  #Returns: -
  def write_stream(prefix, zip, tgf, versions)
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
