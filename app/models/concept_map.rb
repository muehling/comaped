class ConceptMap < ApplicationRecord
  has_many :concepts
  has_many :edges

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
    end
    return map
  end
end
