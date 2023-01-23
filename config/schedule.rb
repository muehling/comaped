# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Important:
#update cron development: whenever --update-crontab --set environment='development'

# Learn more: http://github.com/javan/whenever

# DH: Create the logs
#set :output, './log/cron.log'
#
## DH: Check every minute for inactive students
#every 1.minutes do
#  runner "puts 'Check inactive students'"
#  runner 'puts Time.now'
#  runner 'Student.delete_inactive'
#end
