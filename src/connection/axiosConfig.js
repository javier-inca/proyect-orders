import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.50.187:8081'
//axios.defaults.baseURL = 'http://localhost:8000'

axios.defaults.headers.common['Content-Type'] = 'application/json'

export default axios