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

  #Import data from a ZIP file in the same format that to_zip creates
  #Parameter:
  # data: The ZIP stream data
  # prefix: A path that will be used as a prefix when looking for data in the zip file. Used when importing surveys from a project's export. If non-empty, must end with '/''
  #Effect: -
  #Returns: A new object created from the data in the ZIP, including all surveys and concept maps or nil if an error occurrs.
  def self.import_zip(data, prefix)
    zip = Zip::ImportStream(data)
    file = zip.glob(prefix + 'survey.json').first
    survey = Survey.build(JSON.parse(file.get_input_stream.read))
    toDo = zip.glob(prefix + '*.json')
    toDo.each do |c|
      if c.name.split('/')[1] != "survey.json"
        map = survey.concept_maps.build
        map.save
        map.import_json(c.get_input_stream.read)
      end
    end
    survey.save
    return survey
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
