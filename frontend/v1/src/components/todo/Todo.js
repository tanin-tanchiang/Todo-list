import React, {Component} from 'react'
import {Button, Card, CardTitle, CardText, CardBody} from 'reactstrap'

class Todo extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <Card body>
        <CardTitle>
          {this.props.todo.title}
        </CardTitle>
        <CardBody>
          <CardText>
            {this.props.todo.state.name}
          </CardText>
          <Button color = "primary">
            Edit
          </Button>
          <Button color = "danger">
            Delete
          </Button>
        </CardBody>
      </Card>
    )
  }
}

export default Todo
