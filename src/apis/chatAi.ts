import axios from 'axios'

const url = 'http://127.0.0.1:3000/inquery/chat'

export const chatAiFetch = (params: { query: string }) => {
  return axios.get(url, { params }).then((res) => res.data)
}
