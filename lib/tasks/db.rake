namespace :db do
  desc "Updates the database, after the integration of new version"
  task update: :environment do
    ConceptMap.all.each do |cm|
      cm.concepts.each do |c|
        c.data["x"] = c.x
        c.data["y"] = c.y
        c.save
      end
    end
  end

end
