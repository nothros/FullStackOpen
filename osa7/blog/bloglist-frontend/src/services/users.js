import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  console.log(response.data)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }
