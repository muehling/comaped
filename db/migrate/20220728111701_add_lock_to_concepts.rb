class AddLockToConcepts < ActiveRecord::Migration[7.0]
  def change
    add_column :concepts, :lock, :boolean, default: false, null: false
  end
end
