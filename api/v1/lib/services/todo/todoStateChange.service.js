const ftfPlugin = require('fastify-plugin')

module.exports = ftfPlugin(async (ftf, options) => {
  const func = async (todoId, state) => {
    const stateObj = await ftf.service.getObject('State', state)
    console.log(stateObj);
    const todo = await ftf.service.getObject('Todo', todoId)
    todo.state = stateObj
    await todo.save()

    return true
  }
  ftf.service.Todo = Object.assign(ftf.service.Todo || {}, {changeState: func})
})
