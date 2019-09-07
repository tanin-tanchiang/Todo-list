const ftfPlugin = require('fastify-plugin')

module.exports = ftfPlugin(async (ftf,options) => {
  const func = async(title, state) => {
    const stateObj = await ftf.service.getObject('State', state)
    const todo = ftf.model.Todo()
    todo.title = title
    todo.state = stateObj
    try{
      console.log(todo)
      await todo.save()
    }
    catch(err) {
      return false
    }

    return todo._id
  }
  ftf.service.Todo = Object.assign(ftf.service.Todo || {}, {create: func})
})
