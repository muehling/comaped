class UserMailer < ApplicationMailer

  def created(email, password)
    @password = password
    mail(to: email, subject: I18n.t('users.mails.created'))
  end

end
