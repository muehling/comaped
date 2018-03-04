class AddBackgroundcolorToConceptsMaps < ActiveRecord::Migration[5.0]
  def change
    add_column :concept_maps, :backgroundcolor, :text
  end
end
