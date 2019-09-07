function buildFastify(){
  const events = require('events')

  const event = new events.EventEmitter()

  process.env.TZ = 'Asia/Bangkok'

  const env = 'development'

  const config = require('./config/'+env)

  config.env = env

  if(require.main === module){
    console.info(`Loaded '${env}' configuration`)
  }

  let ftfOption ={
    logger: require.main === module
  }

  if(require.main === module){
    ftfOption = {
      logger:true
    }
  }
  const ftf = require('fastify')(ftfOption)

  if(require.main === module) {
    ftf.register(require('fastify-cors'), {
      origin:[
        'http://localhost:8080',
        'http://localhost:4000',
        'http://localhost:5000'
      ]
    })
  }

  const autoload = require('fastify-autoload-recursive')

  const path = require('path')

  ftf.register(require('./lib/etc'), {
    config: config,
    event: events
  })

  if(require.main === module) {
    ftf.register(require('fastify-swagger'), {
      routePrefix: '/api',
      swagger:{
        info:{
          title: 'Todo-list',
          description: `${env} enviroment`,
          version: '1'
        },
        host: config.swagger.host,
        schemes: ['http'],
        consumer: ['application/json'],
        producer: ['application/json']
      },
      exposeRoute:true
    })
  }

  if(require.main !== module) {
    config.mongo.db = config.mongo.db + '__testing'
  }

  ftf.register(require('./lib/db'), config)

  // ftf.decorate('hook', {})

  // ftf.register(autoload, {
  //   dir:path.join(__dirname, 'lib', 'hooks'),
  //   options: {config: config}
  // })

  ftf.decorate('model',{})

  ftf.register(autoload, {
    dir:path.join(__dirname, 'lib', 'models'),
    options: {config: config}
  })

  ftf.decorate('service', {})

  ftf.register(autoload, {
    dir:path.join(__dirname, 'lib', 'services'),
    options: {config: config}
  })

  ftf.register(require('./lib/schemas/schemaOrder.js'),{config:config})

  ftf.register(autoload, {
    dir:path.join(__dirname, 'routes'),
    options:{config: config}
  })

  if(require.main === module) {
    ftf.listen(config.server.port, config.server.ip, (err, address) => {
      if(err) {
        ftf.log.error(err)
        process.exit(1)
      }
    })
  }

  setTimeout(async () => {
    await ftf.ready()
  }, 1)

  if(require.main === module) {
    var cron = require('node-cron')
  }

  ftf.onClose(() => {
    ftf.mongoose.connection.close()
  })

  return [ftf, config, event]
}
if(require.main === module){
  buildFastify()
}
else{
  module.exports = buildFastify
}
