import {create} from 'apisauce'

export default create({
  baseURL: 'http://127.0.0.1:8080',
  headers: {
    'Accept': 'application/json'
  }
})
