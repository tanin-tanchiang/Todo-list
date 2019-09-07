const ftfPlugin = require('fastify-plugin')

module.exports = ftfPlugin(async (ftf , options) => {
  const schemas = [
    './state/stateBasic.schema',
    './todo/todoBasic.schema',
    './todo/todoCreatetion.schema'
  ]

  for(let i=0; i<schemas.length; i++) {
    const schema =require(schemas[i])
    ftf.addSchema(schema(options))
  }
})
