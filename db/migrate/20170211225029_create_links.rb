class CreateLinks < ActiveRecord::Migration[5.0]
  def change
    create_table :links do |t|
      t.integer :start_id
      t.integer :end_id
      t.string :label
      t.integer :concept_map_id

      t.timestamps
    end
  end
end
