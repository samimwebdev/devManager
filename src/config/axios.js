import axios from 'axios'

export const axiosPublicInstance = axios.create({
  baseURL: 'http://localhost:1337/api',
})

// export const token = JSON.parse(localStorage.getItem('token'))

export const axiosPrivateInstance = (token) =>
  axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
