json.edge do
  json.from @link.start_id
  json.to @link.end_id
  json.label @link.label
  json.id @link.id
  json.font do
    json.align @link.start_id < @link.end_id ? 'bottom' : 'top'
  end
  json.labelHighlightBold false
  json.arrowStrikethrough false
  json.color do
    json.color '#a0a0a0'
    json.hover '#808080'
    json.highlight'#808080'
  end
  json.hoverWidth 0.5

end
