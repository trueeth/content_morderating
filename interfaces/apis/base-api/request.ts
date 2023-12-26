import axios from 'axios'

export const CServerUrl = 'https://gamr-cm-api-dev.azurewebsites.net/api/'

// create an axios instance
const service = axios.create({
  baseURL: CServerUrl, // url = base url + request url
  timeout: 300000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    config.headers['authorization'] = 'Basic ZGVtbzptQmVAdmVyIzEyM1Q='
    return config
  },
  (error) => {
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    // if the custom code is not 200, it is judged as an error.
    if (res.code >= 300) {
      if (res.code === 508 || res.code === 512 || res.code === 514) {
        console.error(res)
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response
    }
  },
  (error) => {
    console.error('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
