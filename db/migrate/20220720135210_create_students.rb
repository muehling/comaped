class CreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|
      t.text :name
      t.integer :concept_map_id
      t.string :color
      t.timestamps
    end
  end
end
