import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://my-json-server.typicode.com/KulchytskyiOleh/Vue_3_pinia'
})

export default instance