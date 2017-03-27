class ConceptMapMailer < ApplicationMailer

  def created(email, code, anonymous)
    @code = code
    @anonymous = anonymous
    mail(to: email, subject: I18n.t('concept_maps.mails.created'))
  end

  def edited(email, code)
    mail(to: email, subject: I18n.t('concept_maps.mails.edited'))
  end

end
