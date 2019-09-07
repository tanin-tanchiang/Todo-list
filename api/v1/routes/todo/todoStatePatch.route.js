module.exports = async(ftf, options) =>{
  const db = ftf.mongoose
  ftf.route({
    method: 'PATCH',
    url: '/todo/:todoId/state/:state',
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
          state:{
            type: 'string',
            description: 'state you want to change'
          },
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
      const done = await ftf.service.Todo.changeState(request.params.todoId, request.params.state)

      return {done}
    }
  })
}
