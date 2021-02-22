export function getQueryStringValue(key) {
  const queryParams = new URLSearchParams(window.location.search)
  return queryParams.get(key)
}
