class CreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|
      t.text :name
      t.integer :online
      t.references :concept_map, null: false, foreign_key: true

      t.timestamps
    end
  end
end
