class CreateConceptMaps < ActiveRecord::Migration[5.0]
  def change
    create_table :concept_maps do |t|
      t.string :code
      t.integer :accesses
      t.integer :survey_id

      t.timestamps
    end
  end
end
