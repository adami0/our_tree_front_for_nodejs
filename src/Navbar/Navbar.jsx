import React from 'react';
import logo from '../tree.png';
import '../App.css'
import './Navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeIdNull: null,
      user_token: null
    };
  }
  render() {
    return (
      <div id="navbar">
        <div id="navbar1" className="siimple-tabs">
          <img id="logo" className="" src={logo} alt="logo" />
          <div className="nav_section siimple-tabs-item" id="homepage" onClick={() => this.goToTreeList()}>homepage</div>
          <div className="nav_section siimple-tabs-item" id="about_us">about us</div>
          {this.state.user_token ? <div className="nav_section siimple-tabs-item" id="log out">log out</div> : null}
        </div>
      </div>
    );
  }

  //to go to tree list, we need to make treeId false
  goToTreeList() {
    this.props.parentCallback(this.state.treeIdNull);
  }
}

export default Navbar;