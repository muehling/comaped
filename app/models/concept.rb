class Concept < ApplicationRecord
  belongs_to :concept_map
  has_many :out_links, class_name: "Link", foreign_key: 'start_id', dependent: :destroy
  has_many :in_links, class_name: "Link", foreign_key: 'end_id', dependent: :destroy

  validate :concept_present_and_unique

  serialize :data, Hash           #Speichert Infos als Key/Value Paare. Feste Keys:
                                  #-x: x-Koordinate
                                  #-y: y-Koordinate
                                  #-color: Farbe für das Konzept


  def concept_present_and_unique
    if label.blank?
      errors.add(:label, "Blank")
    end
    unless concept_map.concepts.find_by_label(label).nil? || concept_map.concepts.find_by_label(label) == self
      errors.add(:label, "Unique")
    end
  end

  def to_json
    return "hallo"
  end
end
