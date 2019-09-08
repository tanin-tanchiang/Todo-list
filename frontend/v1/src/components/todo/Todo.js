import React, {Component} from 'react'
import {Button,
  Modal, ModalHeader, ModalBody,
  Form, FormGroup, Label, Input,
  Card, CardTitle, CardText, CardBody}
  from 'reactstrap'
import ToggleButton from 'react-toggle-button'

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      value: this.props.todo.state.name == 'completed'
    }
    this.toggle = this.toggle.bind(this)
    this.toggleValue = this.toggleValue.bind(this)
  }
  toggleValue(){
    this.setState( prevState => ({
      value: !prevState.value
    }))
  }
  toggle(){
    this.setState( prevState => ({
      modal: !prevState.modal
    }))
  }

  async handleDelete(e){
    e.preventDefault()
    alert("Delete this Todo")
    let response = await fetch(('http://localhost:3000/todo/'+this.props.todo._id), {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      return response.json()
    })
    if(response.done){

      window.location.reload()
    }
    else
      alert("Cannot Delete")
  }

  async handleEdit(e){
    e.preventDefault()
    if(this.props.todo.title != e.target.title.value){
      await fetch(('http://localhost:3000/todo/'+this.props.todo._id), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: e.target.title.value})
      }).then(function (response) {
        return response.json()
      })
    }
    if(!(this.props.todo.state.name == 'completed' && this.state.value)){
      let value = this.state.value ? 'completed' : 'incomplete'
      await fetch(('http://localhost:3000/todo/'+this.props.todo._id+'/state'), {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({state:value})
      }).then(function (response) {
        return response.json()
      })
    }
    window.location.reload()
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
          <Button onClick = {this.toggle} color = "primary">
            Edit
          </Button>
          <Modal isOpen = {this.state.modal} toggle = {this.toggle}>
            <ModalHeader toggle = {this.toggle}>New Todo
            </ModalHeader>
            <ModalBody>
              <Form onSubmit = {this.handleEdit.bind(this)}>
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    type = "text"
                    id = "title"
                    defaultValue = {this.props.todo.title}/>
                </FormGroup>
                <ToggleButton
                id = 'state'
                inactiveLabel = 'incom'
                activeLabel = 'com'
                value = {this.state.value || false}
                onClick = {this.toggleValue}
                />
                <Button style = {{margin: "10px"}} color = "success" type = 'submit'> Submit </Button>
              </Form>
            </ModalBody>
          </Modal>
          <Button onClick = {this.handleDelete.bind(this)} color = "danger">
            Delete
          </Button>
        </CardBody>
      </Card>
    )
  }
}

export default Todo
