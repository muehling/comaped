class AddDataToConceptsMaps < ActiveRecord::Migration[5.0]
  def change
    add_column :concept_maps, :data, :text
  end
end
