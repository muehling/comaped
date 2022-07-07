class AddArrowsToLinks < ActiveRecord::Migration[7.0]
  def change
    add_column :links, :arrows, :string
  end
end
