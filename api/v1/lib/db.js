const ftfPlugin = require('fastify-plugin')
const mongoose = require('mongoose')

module.exports = ftfPlugin(async (ftf, options)=> {
  const {user, pass, host, db, authdb, port} = options.mongo
  const connStr = `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=$authdb`
  console.log(connStr);
  await mongoose.connect(connStr, {
      useNewUrlParser: true,
      useCreateIndex: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 10000
  })

  if(db.endsWith('__testing')){
    await mongoose.connection.db.dropDatabase()
  }

  ftf.decorate('mongoose', mongoose)
})
