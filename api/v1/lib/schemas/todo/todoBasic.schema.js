module.exports = (options) => {
  return {
    $id: 'todoBasic',
    type: 'object',
    properties: {
      _id:{
        type: 'string'
      },
      title: {
        type:'string'
      },
      state: 'stateBasic#'
    }
  }
}
