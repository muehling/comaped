require 'json'

class Version < ApplicationRecord

  belongs_to :concept_map

  after_initialize do |v|
    @json = JSON.parse(self.map)
  end

  #Formatted representation of the date of the version
  #Params: -
  #Effect: -
  #Returns: Formatted string of date in the local time zone, including year, month, day, hour and minute.
  def date
    self.created_at.localtime.strftime("%Y-%m-%d %H:%M")
  end

  #Formatted representation of the date of the version
  #Params: -
  #Effect: -
  #Returns: Formatted string of date in the local time zone, including year, month, day, hour, minute, second
  def timestamp
    self.created_at.localtime.strftime("%Y-%m-%dT%H:%M:%S%z")
  end

  #Counts the number of associations of this version
  #Params: -
  #Effect: -
  #Returns: The number of associations of this version
  def associations
    @json["links"].count
  end

  #Returns the hash data parsed from JSON of this version
  #Params: -
  #Effect: -
  #Returns: Hash with the parsed JSON data
  def data
    @json
  end

  #Creates a TGF representation of this version
  #Params: -
  #Effect: -
  #Returns: TGF data of this version
  def to_tgf
    res = ""
    @json["concepts"].each do |concept|
      res = res + concept["id"].to_s + " " + concept["label"] + "\n"
    end
    res = res + "#\n"
    @json["links"].each do |edge|
      res = res + edge["start_id"].to_s + " " + edge["end_id"].to_s + " " + edge["label"] + "\n"
    end
    return res
  end

end
