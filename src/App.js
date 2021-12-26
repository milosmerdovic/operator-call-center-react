import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
/* Icons, Buttons, Navbar */
import {  Navbar } from 'react-bootstrap';
import {  FaListUl } from 'react-icons/fa';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { VscCallOutgoing, VscCallIncoming } from "react-icons/vsc";
/* Pro-Sidebar */
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import HelloWorld from "./components/operatorList";
/* Components */
import { Alert } from './components/Alert';
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import OutgoingCallTemplate from "./components/outgoing-call-template"
import OutgoingCallListImport from "./components/outgoing-call-list-import";
/* Services */
import { history } from './helpers/history';
import AuthService from "./services/auth.service";
/* Not used */
import BoardAdmin from "./components/board-admin.component";
import BoardModerator from "./components/board-moderator.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.switchSidebar = this.switchSidebar.bind(this);
    
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      menuCollapse: true
    };
  }
  
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  switchSidebar() {
    this.setState(changeState => ({
      menuCollapse: !changeState.menuCollapse
    }));
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard} = this.state;
    return (
      <div>
        <Navbar className="navbar" sticky="top" >
          <Link to={"/home"} className="navbar-brand">
            CalLibri
          </Link>
          <div className="navbar-nav mr-auto">

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/outgoingCallTemplate"} className="nav-link">
                Templejti odlaznih poziva
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/outgoingCallListImport"} className="nav-link">
                Kreiranje liste za zvanje 
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/operatorList"} className="nav-link">
                Lista poziva za operatere
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </Navbar>
          <ProSidebar collapsed={this.state.menuCollapse} style={{
            position: "fixed"
          }}>
            <SidebarHeader>
            <div className="sideBarHeader">
              <Link to={"/home"}>Početna</Link>
            </div>
            </SidebarHeader>

            <SidebarContent>
              <Menu iconShape="round">
                <SubMenu title="Liste za pozivanje" icon={<FaListUl />}>
                  <MenuItem icon={<VscCallOutgoing />}>Lista za pozivanje
                    <Link to={"/home"} />
                  </MenuItem>
                  <MenuItem>Lista svih kontakata
                    <Link to={"/home"} />
                  </MenuItem>
                  <MenuItem>Lista odbijenih poziva
                    <Link to={"/home"} />
                  </MenuItem>
                  <MenuItem>Lista neresenih poziva
                    <Link to={"/home"} />
                  </MenuItem>
                  <SubMenu title="Lista 4">
                    {<MenuItem>Filter Lista
                      <Link to={"/"} />
                    </MenuItem>}
                    {<MenuItem>Filter Lista2</MenuItem>}
                  </SubMenu>  
                </SubMenu>
                <MenuItem icon={<VscCallOutgoing />}>Lista za pozivanje
                  <Link to={"/home"} />
                </MenuItem>
                <MenuItem icon={<VscCallIncoming />}>Lista svih kontakata
                  <Link to={"/home"} />
                </MenuItem>
                <MenuItem icon={<VscCallOutgoing />}>Lista odbijenih poziva
                  <Link to={"/home"} />
                </MenuItem>
                <MenuItem icon={<VscCallOutgoing />}>Lista neresenih poziva
                  <Link to={"/home"} />
                </MenuItem>
                <div className="sidebar-btn-wrapper"style={{
                  textAlign: "center",
                  padding: "20px 24px",
                  fontSize: "18"
                }}
                >
                <div className="closemenu" onClick={this.switchSidebar}>
                  {this.state.menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
                </div>
              </div>
              </Menu>
            </SidebarContent>
        </ProSidebar>

          <Alert />
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route history={history} exact path="/outgoingCallTemplate" component={OutgoingCallTemplate} />
              <Route path="/outgoingCallListImport" component={OutgoingCallListImport} />
              <Route path="/operatorList" component={HelloWorld} />
            </Switch>
      </div>
    );
  }
}

export default App;
