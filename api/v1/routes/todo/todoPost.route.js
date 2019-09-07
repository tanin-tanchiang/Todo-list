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
        200: {
          type: 'object',
          properties: {
            id:{
              type: 'string'
            }
          }
        }
      }
    },
    handler: async(request, reply) => {

      const title = request.body.title
      const state = request.body.state
      const todo = await ftf.service.Todo.create(title, state)
      if(todo){
        return {id: todo}
      }
      reply.status(401).send(new Error('Todo not found'))
    }
  })
}
