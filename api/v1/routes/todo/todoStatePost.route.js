module.exports = async(ftf, options) =>{
  const db = ftf.mongoose
  ftf.route({
    method: 'POST',
    url: '/todo/:todoId/state',
    schema: {
      description: 'set todo title <br><br>',
      tags:['todo'],
      params: {
        type: 'object',
        properties: {
          todoId:{
            type: 'string',
            description: 'todo you want to change title'
          }
        }
      },
      body: {
        type: 'object',
        properties: {
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
      const done = await ftf.service.Todo.changeState(request.params.todoId, request.body.state)

      return {done}
    }
  })
}
