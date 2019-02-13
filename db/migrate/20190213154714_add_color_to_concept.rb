class AddColorToConcept < ActiveRecord::Migration[5.0]
  def change
    add_column :concepts, :color, :text
  end
end
