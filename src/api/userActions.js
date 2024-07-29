import axios from '../axios'

export const userApi = {
  getUsers() {
    try {
      return axios.get('/users')
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  },

  getUserById(id) {
    try {
      return axios.get(`/users/${id}`)
    } catch (error) {
      console.error('Error fetching user by id:', error)
    }
  },

  createUser(newUser) {
    try {
      return axios.post('/users/', newUser)
    } catch (error) {
      console.error('Error creating user:', error)
    }
  },

  updateUserDataById(id, data) {
    try {
      return axios.put(`/users/${id}`, data)
    } catch (error) {
      console.error('Error when trying update user data:', error)
    }
  },

  deleteUser(id) {
    try {
      return axios.delete('/users/', id)
    } catch (error) {
      console.error('Error when trying delete user:', error)
    }
  }
}
