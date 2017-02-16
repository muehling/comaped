class CreateConcepts < ActiveRecord::Migration[5.0]
  def change
    create_table :concepts do |t|
      t.string :label
      t.float :x
      t.float :y
      t.integer :concept_map_id

      t.timestamps
    end
  end
end
