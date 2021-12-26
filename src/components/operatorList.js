import React, { Component } from 'react';
import { FormControl }from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import 'react-pro-sidebar/dist/css/styles.css';
import '../styles/operator.css';
import operatorServiceList from '../services/operatorServiceList';

class HelloWorld extends Component{
  constructor(props){
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChange2 = this.handleOnChange.bind(this);
    this.handleOnChange3 = this.handleOnChange.bind(this);
    this.handleOnChange4 = this.handleOnChange.bind(this);
    this.saveUser = this.saveUser.bind(this);

    this.state = {
      users: [],
      comment: '',
      checked: false,
      checkedtwo: false,
      checkedthree: false,
      checkedfour: false
    }
  }
  componentDidMount(){
    operatorServiceList.getListForCalls().then((res) => {
        this.setState({users: res.data });
    });
  }
  
  saveUser=(event)=>{
    const userObj = {comment: this.state.comment};
    console.log(' user => ' + JSON.stringify(userObj));
    console.log(event.target.name.value);
  }

  handleOnChange() {
    this.setState(changeState => ({
      setChecked: !changeState.checked
    }));
  }

  render(){
    return(
    <div className="container">
    <h3 className="p-3 text-center">Lista za zvanje</h3>
    <div className='row' style={{
      margin: "20px"
    }}>
      <div className='col-md-6' style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-evenly"
        }}>
        <div className='checkStatus'>
          Za zvanje <input
          value={"status"}
          type="checkbox"
          checked={this.checked}
          onChange={this.handleOnChange}
        /> 
        </div>
        <div>
          Rešen <input
          value={"status1"}
          type="checkbox"
          checked={this.checkedtwo}
          onChange={this.handleOnChange2}
          />
        </div>
        <div>
          Odlozen <input
          value={"status2"}
          type="checkbox"
          checked={this.checkedthree}
          onChange={this.handleOnChange3}
          />
        </div>
        <div>
          Ne javlja se <input
          value={"status3"}
          type="checkbox"
          checked={this.checkedfour}
          onChange={this.handleOnChange4}
          />
        </div>
      </div>   
      <div className='col-md-6'>
        <FormControl
            type="search"
            placeholder="Pretraga"
            className="mr-2"
            aria-label="Search"
          /> 
        </div>
    </div>

  <div className='cards'>
    {this.state.users.map(user =>
    <Accordion defaultActiveKey="1">
    <form>
      <Card style={{
          align: "center",
          display: "flex",
          justify: "space-between",
          margin: 0,
        }}>
        <div className='userCard' key={user.id}>
          <span>Ime:  {user.name}</span>
          <span>Broj: {user.phone}</span>
          <Accordion.Toggle as={Button}
              variant="success" eventKey="0">
              Pregled
          </Accordion.Toggle>
          <DropdownButton id="dropdown-basic-button" title="Akcije">
            <Dropdown.Item href="#/action-1">Završi</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Ne javlja se</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Kreirati napomenu</Dropdown.Item>
          </DropdownButton>
            <input type={"text"} name='comment' placeholder='Unesite komentar'/>
          <input type={"submit"} value={" Potvrdi "} onClick={this.saveUser} />
        </div>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
          Napisati istoriju akcija sa korisnikom
          <input type={"text"} name='field'/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </form>
    </Accordion>
    )}
    </div>
  </div>
    );
  }
}

export default HelloWorld