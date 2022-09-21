json.node do
  json.id @concept.id
  json.label @concept.label
  json.lock @concept.lock
  json.shape "ellipse"
  json.borderWidth 2
  json.x @concept.x
  json.y @concept.y
  json.color do
    json.background @concept.color || default_color
    json.border @concept.color || default_color
    json.hover do
      json.background get_highlight(@concept.color)
      json.border get_highlight(@concept.color)
    end
    json.highlight do
      json.background get_highlight(@concept.color)
      json.border "black"
    end
  end

end
