# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_10_21_081847) do
  create_table "concept_maps", force: :cascade do |t|
    t.string "code"
    t.integer "accesses"
    t.integer "survey_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "concepts", force: :cascade do |t|
    t.string "label"
    t.float "x"
    t.float "y"
    t.integer "concept_map_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.text "color"
    t.string "shape"
    t.boolean "lock", default: false, null: false
  end

  create_table "links", force: :cascade do |t|
    t.integer "start_id"
    t.integer "end_id"
    t.string "label"
    t.integer "concept_map_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.boolean "lock", default: false, null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "user_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.boolean "enable_coworking", default: false, null: false
  end

  create_table "students", force: :cascade do |t|
    t.text "name"
    t.integer "concept_map_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "color", null: false
    t.index ["concept_map_id"], name: "index_students_on_concept_map_id"
  end

  create_table "surveys", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "code"
    t.text "introduction"
    t.text "association_labels"
    t.text "concept_labels"
    t.text "initial_map"
    t.date "start_date"
    t.date "end_date"
    t.integer "project_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "capabilities"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "versions", force: :cascade do |t|
    t.integer "concept_map_id"
    t.text "map"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  add_foreign_key "students", "concept_maps"
end
