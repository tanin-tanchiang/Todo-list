module.exports = (options) => {
  return {
    $id: 'todoCreatetion',
    type: 'object',
    properties: {
      title: {
        type: 'string'
      },
      state: {
        type: 'string'
      }
    }
  }
}
