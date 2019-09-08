const ftfPlugin = require('fastify-plugin')

module.exports = ftfPlugin(async (ftf, options) => {
  const func = async (todoId) => {
  const remove = await ftf.model.Todo.remove({
    _id: todoId.toObjectId()
  })
  return remove
  }
  ftf.service.Todo = Object.assign(ftf.service.Todo || {}, {remove: func})
})
