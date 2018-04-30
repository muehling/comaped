namespace :db do
  desc "TODO"
  task update: :environment do
    ConceptMap.all.each do |cm|
      cm.data["background_color"] ="#f8f8f8"
      cm.save
      cm.concepts.each do |c|
        c.data["x"] = c.x
        c.data["y"] = c.y
        c.data["color"] = "#dff0d8"
        c.save
      end
    end
  end

end
