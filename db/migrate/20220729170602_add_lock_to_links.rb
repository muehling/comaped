class AddLockToLinks < ActiveRecord::Migration[7.0]
  def change
    add_column :links, :lock, :boolean, default: false, null: false
  end
end
