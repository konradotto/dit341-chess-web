import axios from 'axios'

export const Api = axios.create({
  baseURL: `${process.env.VUE_APP_API_ENDPOINT}/api/v1` || 'http://localhost:27018/api/v1'
})
