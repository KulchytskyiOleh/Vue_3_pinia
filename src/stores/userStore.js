import { defineStore } from 'pinia'
import { userApi } from '../api/userActions'

export const useTodoStore = defineStore('user', {
  state: () => ({
    user: {},
    users: []
  }),

  actions: {
    async getUsers() {
      try {
        const response = await userApi.getUsers()
        return (this.users = response.data)
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    },

    async getUserById(id) {
      try {
        const response = await userApi.getUserById(id)
        return (this.user = response.data)
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    },

    async createUser(data) {
      try {
        const response = await userApi.createUser(data)
        return (this.user = response.data)
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    },

    async updateUserData(id, data) {
      try {
        const response = await userApi.updateUserDataById(id, data)
        return (this.user = response.data)
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    },

    async deleteUser(id) {
      if (id) {
        try {
          const response = await userApi.deleteUser(id)
          return (this.user = response.data)
        } catch (error) {
          console.error('Error deleting user:', error)
        }
      }
    }
  },
  persist: true
})
