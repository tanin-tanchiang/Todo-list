import React, {Component} from 'react'
import {Button, ButtonGroup,
  CardDeck, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Label, Input,
  Row, Col} from 'reactstrap'
import Todo from './Todo'
import 'bootstrap/dist/css/bootstrap.css'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal:false,
      todoList: []
    }
    this.toggle = this.toggle.bind(this)
  }
  async handleSubmit(e){
    e.preventDefault()
    let state = e.target.state.value
    if(!state){
      state = "incomplete"
    }
    var body = {
      'title': e.target.title.value,
      'state': state
    }
    await fetch('http://localhost:3000/todo', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(body)
    })
    .then(function (response) {
      return response.json()
    })
    
    window.location.reload()
  }
  toggle(){
    this.setState( prevState => ({
      modal: !prevState.modal
    }))
  }

  createList = () =>{
    let TodoList = []
    for(let i = 0; i < this.state.todoList.length; i++){
      TodoList.push(
        <Col
        style ={{marginTop: "10px"}}
        md = "6" lg = "4" xl = "3"
        key = {this.state.todoList[i]._id}>
          <Todo
          key = {this.state.todoList[i]._id}
          todo = {this.state.todoList[i]}
          />
        </Col>
      )
    }
    return TodoList
  }

  async componentDidMount(){
    await fetch('http://localhost:3000/todo-list')
    .then((Response) => Response.json())
    .then((res) => {
      this.setState({todoList: res})
    })
  }

  render(){
    return(
      <div style = {{marginTop: "50px"}}>
        <Button onClick = {this.toggle} color = "success"> New Todo
        </Button>
        <Modal isOpen = {this.state.modal} toggle = {this.toggle}>
          <ModalHeader toggle = {this.toggle}>New Todo
          </ModalHeader>
          <ModalBody>
            <Form onSubmit = {this.handleSubmit.bind(this)}>
              <FormGroup>
                <Label>Title</Label>
                <Input type = "text" id = "title"/>
              </FormGroup>
              <FormGroup>
                <Label>State</Label>
                <Input type = "text" id = "state"/>
              </FormGroup>
              <Button color = "success" type = 'submit'> Submit </Button>
            </Form>
          </ModalBody>
        </Modal>

        <Row style = {{margin: "10px 10px 0px 10px",}}>
          {this.createList()}
        </Row>
      </div>
    )
  }
}
export default TodoList
