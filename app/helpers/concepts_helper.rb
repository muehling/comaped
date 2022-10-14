module ConceptsHelper

  def highlights
    ['#bfd0b8', '#0095b6', '#efbd9b', '#aebbef', '#cec463', '#ef7474']
  end

  def colors
    ['#cfe0c8', '#0ea5c6', '#ffcdab', '#becbff', '#ded473', '#ff8484']
  end

  def shapes
    [ 'ellipse', 'box', 'circle']
  end

  def default_color
    return colors[0]
  end

  def palette(i)
    return colors[i]
  end

  def shape_palette(i)
    return shapes[i]
  end

  def get_highlight(color)
    i = colors.index(color)
    if i.nil?
      return default_color
    else
      return highlights[colors.index(color)]
    end
  end
end
