// // src/mocks/handlers.js
// import { rest } from 'msw'

// export const handlers = [
//   rest.get('/todos', (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json([
//         { id: 1, userId: 1, title: 'Task 1 for John', completed: false },
//         { id: 2, userId: 1, title: 'Task 2 for John', completed: true },
//         { id: 3, userId: 2, title: 'Task 1 for Jane', completed: false }
//       ])
//     )
//   }),
//   rest.post('/todos', (req, res, ctx) => {
//     const { title, userId } = req.body
//     return res(ctx.status(201), ctx.json({ id: Date.now(), title, userId, completed: false }))
//   })
//   // Інші обробники (handlers) для PUT, DELETE запитів
// ]
