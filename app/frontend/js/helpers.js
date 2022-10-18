export const getLanguage = () => {
  const language =
    navigator.userLanguage ||
    (navigator.languages && navigator.languages.length && navigator.languages[0]) ||
    navigator.language ||
    navigator.browserLanguage ||
    navigator.systemLanguage
  return language.substr(0, 2)
}
