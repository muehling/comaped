class AddDataToConcepts < ActiveRecord::Migration[5.0]
  def change
    add_column :concepts, :data, :text
  end
end
