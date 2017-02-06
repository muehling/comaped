class CreateAssociatons < ActiveRecord::Migration[5.0]
  def change
    create_table :associatons do |t|
      t.string :label
      t.integer :concept_map_id
      t.integer :start
      t.integer :end

      t.timestamps
    end
  end
end
