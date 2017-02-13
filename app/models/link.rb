class Link < ApplicationRecord

  belongs_to :concept_map
  belongs_to :start, class_name: Concept
  belongs_to :end, class_name: Concept
end
