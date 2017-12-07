class AddDataToConcepts < ActiveRecord::Migration
  def change
    add_column :concepts, :data, :text
  end
end
