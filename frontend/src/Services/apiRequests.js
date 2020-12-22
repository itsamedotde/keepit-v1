const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

export function apiGetAllKeepits() {
  const body = {
    email: 'user@email',
    password: 'test',
  }
  return requestApi(body, `${apiBaseUrl}/keepit/getall`, 'POST')
}

export function apiGetVisionLabels(body) {
  return requestApi(body, `${apiBaseUrl}/images/preload`, 'POST')
}

export function apiSaveKeepit(body) {
  return requestApi(body, `${apiBaseUrl}/keepit/add`, 'POST')
}

export function apiDeleteKeepit(id) {
  return requestApi('', `${apiBaseUrl}/keepit/delete/` + id, 'POST')
}

export function requestApi(body, url, method) {
  console.log('Api Request - url', url)
  console.log('Api Request - body', body)
  console.log('Api Request - method', method)

  const myHeaders = new Headers()
  let requestOptions = ''
  myHeaders.append('Content-Type', 'application/json')
  if (method === 'DELETE') {
    requestOptions = {
      method: method,
      headers: myHeaders,
      redirect: 'follow',
    }
  }
  if (method === 'POST') {
    requestOptions = {
      method: method,
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: 'follow',
    }
  }
  return fetch(url, requestOptions).then((response) => response.json())
}
