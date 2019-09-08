import React, {Component} from 'react'
import {Route} from 'react-router-dom'

import TodoList from './../components/todo/TodoList'

class Router extends Component {
  constructor(props) {
    super(props)
  }
  render()  {
    return  (
      <Route path = '/todo' component = {TodoList}/>
    )
  }
}
export default Router
