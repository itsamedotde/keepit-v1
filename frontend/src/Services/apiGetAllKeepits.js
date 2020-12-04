export default async function apiGetAllKeepits(body) {
  const url = 'http://keepit-be.local/keepit/getall'
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
