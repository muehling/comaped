class AddShapeToConcepts < ActiveRecord::Migration[7.0]
  def change
    add_column :concepts, :shape, :string
  end
end
