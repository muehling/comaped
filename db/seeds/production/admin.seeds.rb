STDOUT.puts "Enter e-mail for admin:"
email = STDIN.gets.strip.downcase
STDOUT.puts "Enter password for admin:"
pw = STDIN.gets.strip
STDOUT.puts "Re-enter password for admin:"
pwc = STDIN.gets.strip

u = User.create(email: email, password: pw, password_confirmation: pwc, capabilities:"admin")
if u.save
  STDOUT.puts "Admin account created!"
else
  STDOUT.puts "Something went wrong!"
end