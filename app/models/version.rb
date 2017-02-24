require 'json'

class Version < ApplicationRecord

  belongs_to :concept_map

  after_initialize do |v|
    @json = JSON.parse(self.map)
  end

  #Formatted representation of the date of the version
  #Params: -
  #Effect: -
  #Returns: JFormatted string of date in the local time zone, including year, month, day, hour and minute.
  def date
    self.created_at.localtime.strftime("%Y-%m-%d %H:%M")
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
end
