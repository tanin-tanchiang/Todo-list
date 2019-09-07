const ftfPlugin = require('fastify-plugin')

module.exports = ftfPlugin(async (ftf, options) => {
  const func = async (todoId, title) => {
    const todo = await ftf.service.getObject('Todo', todoId)
    todo.title = title
    await todo.save()

    return true
  }
  ftf.service.Todo = Object.assign(ftf.service.Todo || {}, {changeTitle: func})
})
