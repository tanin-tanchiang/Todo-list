module.exports = async(ftf, options) =>{
  const db = ftf.mongoose
  ftf.route({
    method: 'PATCH',
    url: '/todo/:todoId/:title',
    schema: {
      description: 'set todo title <br><br>',
      tags:['todo'],
      params: {
        type: 'object',
        properties: {
          todoId:{
            type: 'string',
            description: 'todo you want to change title'
          },
          title: {
            type: 'string',
            description: 'new title'
          }
        }
      },
      response:{
        200:{
          type: 'object',
          properties: {
            done: {
              type: 'boolean'
            }
          }
        }
      }
    },
    handler: async (request, reply) => {
      const done = await ftf.service.Todo.changeTitle(request.params.todoId, request.params.title)

      return {done}
    }
  })
}
