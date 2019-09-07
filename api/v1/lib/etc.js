const ftfPlugin = require('fastify-plugin')
const crypto = require('crypto')

module.exports = ftfPlugin(async (ftf, options) => {

  const etc = {
    initializer: async () => {
      await ftf.ready()

      let state = null

      const states = await ftf.model.State.find()
      if(!states.length) {
        const name = "incomplete"
        states = await ftf.service.State.create(name)

        ftf.log.info('Created incomplete state.')
      }
    }
  }

  ftf.decorate('etc', etc)

})

// convenient way to convert String to mongo object id
String.prototype.toObjectId = function() {
  let objId = 'xxxxxxxxxxxx'
  try {
    const ObjectId = (require('mongoose').Types.ObjectId)
    objId = ObjectId(this.toString())
  }
  catch(err) { }

  return objId
}
// convenient way for mongo to find case insensitive
String.prototype.toMongoRegexI = function() {
  return { $regex: new RegExp('^'+this.toString()+'$', 'i'), $options: 'i'}
}
