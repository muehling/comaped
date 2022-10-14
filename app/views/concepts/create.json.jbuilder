json.node do
  json.id @concept.id
  json.label @concept.label
  json.x @concept.x
  json.y @concept.y
  json.shape @concept.shape
  json.font do
    json.multi "md"
    json.face "georgia"
  end
  json.borderWidth 1
  json.boderWidthSelected 3
  json.labelHighlightBold false
  json.widthConstraint do
    json.maximum 120
  end
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
