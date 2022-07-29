json.edge do
  json.id @link.id
  json.from @link.start_id
  json.to @link.end_id
  json.label @link.label
  json.labelHighlightBold false
  json.font do
    json.align 'top'
  end
  json.arrows @link.arrows
  json.arrowStrikethrough false
  json.color do
    json.color '#a0a0a0'
    json.hover '#808080'
    json.highlight'#808080'
  end
  json.hoverWidth 0.5

end
