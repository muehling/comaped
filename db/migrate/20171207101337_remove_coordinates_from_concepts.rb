class RemoveCoordinatesFromConcepts < ActiveRecord::Migration[5.0]
  def change
    remove_column :concepts, :x, :float
    remove_column :concepts, :y, :float
  end
end
