
class Myclass


  def self.analyze_maps(directory, relevantConcepts)
    puts 'running R!'

    filepath = Rails.root.join('lib', 'external_scripts', 'analyze_maps.R')
    output = `Rscript --vanilla #{filepath} #{directory} #{relevantConcepts}`
    puts 'end R'
    puts "Here's the output:\n #{output}"
    return output
  end

end