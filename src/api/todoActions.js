import axios from '../axios'

export const todoActions = {
  getTodos() {
    try {
      return axios.get('/todos')
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }
}
