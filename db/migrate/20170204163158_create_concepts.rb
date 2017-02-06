class CreateConcepts < ActiveRecord::Migration[5.0]
  def change
    create_table :concepts do |t|
      t.string :label
      t.integer :x
      t.integer :y
      t.integer :concept_map_id

      t.timestamps
    end
  end
end
