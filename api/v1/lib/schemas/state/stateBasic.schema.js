module.exports = (options) => {
  return {
    $id: 'stateBasic',
    type: 'object',
    properties: {
      _id:{
        type: 'string'
      },
      name: {
        type: 'string'
      }
    }
  }
}
