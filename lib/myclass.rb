
class Myclass

  def self.pirate_language
    puts 'running R!'

    filepath = Rails.root.join('lib', 'external_scripts', 'pirate_script.R')

    greetings = [
        'ARRRGH ME MATEYS',
        'Why hello, old chap!',
        'Hollaaaa!',
        'Hello, is it me you\'re looking for?',
        'Avast! Ye ARRRE so smart.',
        'Shiver me timbers this is a gRRReat tutorial!'
    ]

    output = `Rscript --vanilla #{filepath} #{greetings}`
    puts "Here's the output:\n #{output}"
  end

  def self.analyze_maps(directory)
    puts 'running R!'

    filepath = Rails.root.join('lib', 'external_scripts', 'analyze_maps.R')
    puts 'end R'
    output = `Rscript --vanilla #{filepath} #{directory}`
    return output
  end

end