module.exports = async(ftf, options) =>{
  const db = ftf.mongoose
  ftf.route({
    method: 'DELETE',
    url: '/todo/:todoId',
    schema: {
      description: 'Remove a todo',
      tags: ['todo'],
      params: {
        type: 'object',
        properties: {
          todoId:{
            type: 'string',
            description: 'Todo you want to remove'
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties:{
            done: {
              type: 'boolean'
            }
          }
        }
      }

    },

    handler: async(request, reply) => {
      const count = ftf.service.Todo.remove(request.params.todoId)
      if(count !== false) {
        return {done: true}
      }
    }
  })
}
