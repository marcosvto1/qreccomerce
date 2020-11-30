import axios from 'axios'

const api = axios.create({
  baseURL: 'https://app-ecommerce-qrcode.herokuapp.com'
})

export default api
