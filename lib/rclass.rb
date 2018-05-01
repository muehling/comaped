#Class for running different RScripts
class Rclass

  #Run the analysis for concept maps of one survey
  #Input:
  # -directory:path to a temporary directory
  # -relebantConcepts: R Array-String of conceptlabels
  #Output: JSON-String with:
  # - aggregated_map concept map              : with key "aggregated_map"
  # - analysis_data of aggregated concept map : with key "analysis"
  def self.analyze_maps(directory, relevantConcepts)
    puts 'running R!'

    filepath = Rails.root.join('lib', 'external_scripts', 'analyze_maps.R')
    #run R with directorypath and a R Array-String as input
    # R Array-String has the form: "c(1,2,3,4)"
    output = `Rscript --vanilla #{filepath} #{directory} #{relevantConcepts}`
    puts 'end R'
    #puts "Here's the output:\n #{output}"
    return output
  end

end