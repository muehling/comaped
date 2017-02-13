# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(email: 'test@test.com', password: '123', password_confirmation: '123')
Project.create(name: "Test Projekt 1", description: "A short description...", user_id: 1)
Project.create(name: "Test Projekt 2", description: "A short description...", user_id: 1)
p1 = Project.create(name: "Test Projekt 3", description: "A short description...", user_id: 1)
s = p1.surveys.build(name: "Test Befragung 1", code: "abc")
s.save
p1.surveys.build(name: "Test Befragung 2").save
cm = s.concept_maps.build(code: "test")
cm.save
cm.concepts.build(label: "Auto").save
cm.concepts.build(label: "Motor").save
cm.links.build(start: Concept.find(1), end: Concept.find(2), label: "hat").save
