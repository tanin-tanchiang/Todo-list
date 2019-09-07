module.exports = async(ftf, options) =>{
  const db = ftf.mongoose
  
  ftf.route({
    method: 'POST',
    url: '/todo',

    schema: {
      description: 'Create Todo<br><br>',
      tags: ['todo'],
      body: 'todoCreatetion#',
      response: {
        200: 'todoBasic#'
      }
    },
    handler: async(request, reply) => {

      const title = request.body.title
      const state = request.body.state

      const todo = await ftf.service.Todo.create(title, state)
      console.log(todo)
      if(todo){
        return todo
      }
      reply.status(401).send(new Error('Todo not found'))
    }
  })
}
