import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),

  actions: {
    async getTodos() {
      // try {
      //   const response = await axios.get('http://your-api-endpoint/todos')
      //   this.todos = response.data
      // } catch (error) {
      //   console.error('Error fetching todos:', error)
      // }
    },

    async addTodo(todo) {
      if (todo.id) this.todos.push(todo)

      // try {
      //   const response = await axios.post('http://your-api-endpoint/todos', todo)
      //   this.todos.push(response.data)
      // } catch (error) {
      //   console.error('Error adding todo:', error)
      // }
    },

    async deleteTodo(id) {
      if (id) {
        this.todos = this.todos.filter((el) => el.id != id)
      }

      // try {
      //   await axios.delete(`http://your-api-endpoint/todos/${id}`)
      //   this.todos = this.todos.filter((todo) => todo.id !== id)
      // } catch (error) {
      //   console.error('Error deleting todo:', error)
      // }
    },

    async updateTodo(todo) {
      if (todo.id) {
        this.todos = this.todos.map((el) => (el.id === todo.id ? { ...el, text: todo.text } : el))
      }

      // try {
      //   const response = await axios.put('http://your-api-endpoint/todos', todo)
      //   // this.todos.push(response.data);
      //   this.todos = this.todos.filter((todo) => todo.id === id)
      // } catch (error) {
      //   console.error('Error adding todo:', error)
      // }
    },

    todoDoneToggle(todo) {
      if (todo.id) {
        this.todos = this.todos.map((el) => (el.id === todo.id ? { ...el, done: todo.done } : el))
      }
    }
  },
  persist: true
})
