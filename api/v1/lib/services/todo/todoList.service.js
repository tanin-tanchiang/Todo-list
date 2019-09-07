const ftfPlugin = require('fastify-plugin')

module.exports = ftfPlugin(async (ftf, options) => {

  const func = async(todoList) => {
    for(i=0;i<todoList.length;i++){
      todoList[i].state = await ftf.service.getObject('State',todoList[i].state)
    }
    return todoList
  }

  ftf.service.Todo = Object.assign(ftf.service.Todo || {}, {lists: func})

})
