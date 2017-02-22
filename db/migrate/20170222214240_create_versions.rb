class CreateVersions < ActiveRecord::Migration[5.0]
  def change
    create_table :versions do |t|
      t.integer :concept_map_id
      t.text :map

      t.timestamps
    end
  end
end
