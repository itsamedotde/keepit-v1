export default async function apiSaveKeepit(body) {
  const url = 'http://keepit-be.local/keepit/add'
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
