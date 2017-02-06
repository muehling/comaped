class CreateSurveys < ActiveRecord::Migration[5.0]
  def change
    create_table :surveys do |t|
      t.string :name
      t.text :description
      t.string :code
      t.text :introduction
      t.text :association_labels
      t.text :concept_labels
      t.text :initial_map
      t.date :start_date
      t.date :end_date
      t.integer :project_id

      t.timestamps
    end
  end
end
