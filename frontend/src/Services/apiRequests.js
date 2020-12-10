export function apiGetAllKeepits() {
  const body = {
    email: 'user@email',
    password: 'test',
  }
  return requestApi(body, 'http://keepit-be.local/keepit/getall')
}
export function apiGetVisionLabels(body) {
  return requestApi(body, 'http://keepit-be.local/images/preload')
}
export function apiSaveKeepit(body) {
  return requestApi(body, 'http://keepit-be.local/keepit/add')
}

export function requestApi(body, url) {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
    redirect: 'follow',
  }
  return fetch(url, requestOptions).then((response) => response.json())
}
