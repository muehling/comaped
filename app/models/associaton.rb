class Associaton < ApplicationRecord
  belongs_to :concept_map
  belongs_to :start, class_name: Cocnept
  belongs_to :end, class_name: Concept
end
