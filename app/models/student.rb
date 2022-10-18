class Student < ApplicationRecord
  # DH: a student belongs to one map
  belongs_to :concept_map

  # DH: Make sure the student name is unqiue for a concept map
  validates :name, presence: true, uniqueness: { scope: :concept_map_id }
  validates :color, presence: true, uniqueness: { scope: :concept_map_id }

  def self.generate(c_id)
    # generate a random name for a student
    adjectives = ["Crazy", "Happy", "Creative", "Dangerous", "Effective", "Flying"]
    nouns = ["Cat", "Tiger", "Dog", "Shark", "Lion", "Bird", "Rabbit", "Dolphin", "Bear", "Elephant", "Butterfly", "Snake", "Duck", "Chicken"]

    # each student gets a unique color as well: 1 out of 20 (more can be added)
    colors = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45',
    '#fabed4', '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075',
    '#000000']

    random_number = rand.to_s[2..4]
    # create the random name and color
    name = "#{adjectives.sample}-#{nouns.sample}"
    color = "#{colors.sample}"

    # create the student
    create(name: name, concept_map_id: c_id, color: color)
  end

  def self.delete_inactive
    # Delete all students, who have not been active for half an hour
    Student.where('updated_at < ?', DateTime.now - (0.5/24.0)).delete_all

    #for s in deleted
      #ActionCable.server.broadcast("test_channel", {action: "user_left", user_id: s.id, map_id: s.concept_map_id})
    #end
  end
end
