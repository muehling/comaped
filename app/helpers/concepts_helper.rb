module ConceptsHelper

  def highlights
    ['rgb(187, 204, 180)', 'rgb(0, 145, 178)', 'rgb(235, 185, 151)', 'rgb(170, 183, 235)', 'rgb(202, 192, 95)', 'rgb(235, 112, 112)' ]
  end

  def colors
    ['rgb(207, 224, 200)', 'rgb(14, 165, 198)', 'rgb(255, 205, 171)', 'rgb(190, 203, 255)', 'rgb(222, 212, 115)', 'rgb(255, 132, 132)']
  end

  def palette(i)
    return colors[i] || '#dff0d8'
  end

  def get_highlight(color)
    i = colors.index(color)
    if i.nil?
      return '#cfe0c8'
    else
      return highlights[colors.index(color)]
    end
  end
end
