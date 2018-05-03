# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(email: 'test@test.com', password: '123', password_confirmation: '123', capabilities: "admin")
Project.create(name: "Test Projekt 1", description: "A short description...", user_id: 1)
Project.create(name: "Test Projekt 2", description: "A short description...", user_id: 1)
p1 = Project.create(name: "Test Projekt 3", description: "A short description...", user_id: 1)
s = p1.surveys.build(name: "Test Befragung 1", code: "abc")
s.save
p1.surveys.build(name: "Test Befragung 2").save
cm = s.concept_maps.build(code: "test")
cm.save

cm.concepts.build(label: "Auto", data:{"x"=>200,"y"=>0, "color"=>"#ff0000"}).save
cm.concepts.build(label: "Motor", data:{"x"=>0,"y"=>0, "color"=>"#dff0d8" }).save
cm.links.build(start: Concept.find(1), end: Concept.find(2), label: "hat").save
cm.links.build(start: Concept.find(2), end: Concept.find(1), label: " wurde gehabt").save
cm = s.concept_maps.build(code: "test1")
cm.save
cm.concepts.build(label: "Auto", data:{"x"=>200,"y"=>0, "color"=>"#ff0000"}).save
cm.concepts.build(label: "Motor", data:{"x"=>0,"y"=>0, "color"=>"#dff0d8" }).save
cm.links.build(start: Concept.find(3), end: Concept.find(4), label: "hat").save
cm = s.concept_maps.build(code: "tes2")
cm.save
cm.concepts.build(label: "Auto", data:{"x"=>200,"y"=>0, "color"=>"#ff0000"}).save
cm.concepts.build(label: "Motor", data:{"x"=>0,"y"=>0, "color"=>"#dff0d8" }).save
cm.links.build(start: Concept.find(5), end: Concept.find(6), label: "hat").save
cm = s.concept_maps.build(code: "tes3")
cm.save
cm.concepts.build(label: "Auto", data:{"x"=>200,"y"=>0, "color"=>"#ff0000"}).save
cm.concepts.build(label: "Motor", data:{"x"=>0,"y"=>0, "color"=>"#dff0d8" }).save
cm.links.build(start: Concept.find(7), end: Concept.find(8), label: "hat").save
cm.save
cm = s.concept_maps.build(code: "tes4")
cm.concepts.build(label: "Auto", data:{"x"=>200,"y"=>0, "color"=>"#ff0000"}).save
cm.concepts.build(label: "Motor", data:{"x"=>0,"y"=>0, "color"=>"#dff0d8" }).save
cm.links.build(start: Concept.find(9), end: Concept.find(10), label: "hat").save
cm.save
cm = s.concept_maps.build(code: "tes5")
cm.concepts.build(label: "Auto", data:{"x"=>200,"y"=>0, "color"=>"#ff0000"}).save
cm.concepts.build(label: "Motor", data:{"x"=>0,"y"=>0, "color"=>"#dff0d8" }).save
cm.links.build(start: Concept.find(11), end: Concept.find(12), label: "hat").save
cm.save
cm = s.concept_maps.build(code: "tes6")
cm.concepts.build(label: "Auto", data:{"x"=>200,"y"=>0, "color"=>"#ff0000"}).save
cm.concepts.build(label: "Motor", data:{"x"=>0,"y"=>0, "color"=>"#dff0d8" }).save
cm.links.build(start: Concept.find(13), end: Concept.find(14), label: "hat").save
cm.save
cm = s.concept_maps.build(code: "tes7")
cm.concepts.build(label: "Auto", data:{"x"=>200,"y"=>0, "color"=>"#ff0000"}).save
cm.concepts.build(label: "Motor", data:{"x"=>0,"y"=>0, "color"=>"#dff0d8" }).save
cm.links.build(start: Concept.find(15), end: Concept.find(16), label: "hat").save
cm.save
cm = s.concept_maps.build(code: "tes8")
cm.concepts.build(label: "Auto", data:{"x"=>200,"y"=>0, "color"=>"#ff0000"}).save
cm.concepts.build(label: "Motor", data:{"x"=>0,"y"=>0, "color"=>"#dff0d8" }).save
cm.links.build(start: Concept.find(17), end: Concept.find(18), label: "hat").save
cm.save
cm = s.concept_maps.build(code: "tes9")
cm.concepts.build(label: "Auto", data:{"x"=>200,"y"=>0, "color"=>"#ff0000"}).save
cm.concepts.build(label: "Motor", data:{"x"=>0,"y"=>0, "color"=>"#dff0d8" }).save
cm.links.build(start: Concept.find(19), end: Concept.find(20), label: "hat").save
cm.save
