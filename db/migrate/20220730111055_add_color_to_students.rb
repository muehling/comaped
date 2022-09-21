class AddColorToStudents < ActiveRecord::Migration[7.0]
  def change
    add_column :students, :color, :string, null: false
  end
end
