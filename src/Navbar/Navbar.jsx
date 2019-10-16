import React from 'react';
import logo from '../tree.png';
import '../App.css'
import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeIdNull: null,
      user_token: null,
      displayLoginTab: false,
      familyTreeForAdmin: false
    };
  }
  render() {
    return (
      <div id="navbar">
        <div id="navbar1" className="siimple-tabs">
          <div className="grid-3">
            <img id="logo" className="" src={logo} alt="logo" />
            <div id="app-name">ourTree</div>
          </div>
          {this.props.user_token ?
            [!this.state.familyTreeForAdmin ?
              <div className="nav_section siimple-tabs-item" id="homepage" onClick={() => this.goToTreeList()}>FAMILY TREE</div>
              : <div className="nav_section siimple-tabs-item" id="homepage" onClick={() => this.goToAdminPage()}>ADMIN PAGE</div>]
            : null}
          <div className="nav_section siimple-tabs-item" id="about_us" onClick={() => { this.displayAboutUsComponent() }}>ABOUT US</div>
          {this.state.displayLoginTab ? <div className="nav_section siimple-tabs-item" id="log_out" onClick={() => { this.displayLoginComponent() }}>LOG IN</div> : null}
          {this.props.user_token ? <div className="nav_section siimple-tabs-item" id="log_out" onClick={() => { this.removeToken() }}>LOG OUT</div> : null}
        </div>
      </div>
    );
  }

  //to go to tree list, we need to make treeId false
  goToTreeList() {
    this.props.parentCallback(this.state.treeIdNull);
    //tjis is done so only admin may go to admin page front
    if (this.props.admin_page) {
      this.setState({
        familyTreeForAdmin: true
      })
    }
  }

  //to go to admin page for admin
  goToAdminPage() {
    this.props.parentCallback5();
    this.setState({
      familyTreeForAdmin: false
    })
  }

  //used function to disconnect
  sendStatusFalseToParent = () => {
    this.props.parentCallback2();
  }

  displayLoginComponent = () => {
    this.props.parentCallback4();
    //as we got component login we don't need to display the login tab in navbar
    this.setState({
      displayLoginTab: false
    })
  }

  displayAboutUsComponent = () => {
    this.props.parentCallback3();
    if (!this.props.user_token) {
      this.setState({
        displayLoginTab: true
      })
    } else {
      return;
    }
  }

  removeToken = () => {
    if (window.confirm(`Log out of ourTree app ?`)) {
      localStorage.removeItem('ourTreeToken');
      this.sendStatusFalseToParent();
    }
  }
}

export default Navbar;