export const getLanguage = () => {
  const language =
    navigator.userLanguage ||
    (navigator.languages && navigator.languages.length && navigator.languages[0]) ||
    navigator.language ||
    navigator.browserLanguage ||
    navigator.systemLanguage
  return language.substr(0, 2)
}

export const ajax = async ({
  url,
  method = 'GET',
  data,
  contentType = 'application/json',
  accept = 'application/json',
}) => {
  return await fetch(url, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': getCSRFToken(),
      'Content-Type': contentType,
      Accept: accept,
    },
    mode: 'same-origin',
    method: method,
    body: contentType === 'application/json' ? JSON.stringify(data) : data,
  })
}

export const getCSRFToken = () => {
  return document.getElementsByName('csrf-token')[0].getAttribute('content')
}
