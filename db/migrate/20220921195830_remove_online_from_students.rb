class RemoveOnlineFromStudents < ActiveRecord::Migration[7.0]
  def change
    remove_column :students, :online, :integer
  end
end
