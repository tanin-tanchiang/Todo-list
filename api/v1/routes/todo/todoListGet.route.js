module.exports = async(ftf, options) =>{
  const db = ftf.mongoose

  ftf.route({
    method: 'GET',
    url: '/todo-list',
    schema:{
      description : 'Get Todo list<br><br>',
      tags:['todo'],
      response: {
        200: {
          type:'array',
          items:'todoBasic#'
        }
      }
    },

    handler: async(request, reply) => {
      const todoList = await ftf.model.Todo.find()
      const todoList2 = await ftf.service.Todo.lists(todoList)
      // console.log(todoList2);
      if(todoList2){
        return todoList2
      }

      reply.status(401).send(new Error('Todo not found'))
    }
  })
}
