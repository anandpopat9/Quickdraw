const serverUrl = "http://localhost:8080";

export const fetchCommandsRequest = () => fetch(`${serverUrl}/load`, { method: 'GET' })
export const saveCommandsRequest = (cmd) => fetch(`${serverUrl}/save`, { method: 'POST', headers: {
  'Content-Type': 'application/json'
}, body: JSON.stringify(cmd),  })