import React from 'react';
import Navbar from '../Navbar/Navbar'
import Login from '../Login/Login'
import Trees from '../Trees/Trees'
import Members from '../Members/Members'
import './Container.css';
import '../../node_modules/siimple'

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authStatus: '',
            userEmail: '',
            userId: '',
            treeId: ''
        };
    }

    render() {
        return (
            <div id="container">
                <Navbar></Navbar>
                {this.state.authStatus !== 'true' ? 
                <Login key='1' parentCallback = {this.checkAuthStatus} parentCallback2 = {this.retrieveUserEmail}></Login>
                :[this.state.treeId ?
                    <Members key='3' treeId={this.state.treeId}></Members> 
                    :<Trees key='2' parentCallback3 = {this.retrieveTreeId} userId = {this.state.userId}></Trees>]}
            </div>
        );
    }

    checkAuthStatus = (authStatusToBe) => {
        this.setState({
            authStatus: authStatusToBe
        });
    }
   
    retrieveTreeId = (treeId) => {
        this.setState({
            treeId: treeId
        });
        console.log(this.state.treeId);

    } 

    check() {
        console.log(this.state.treeId);

    }

    //we retrieve user email from the child component Login
    retrieveUserEmail = (userEmail) => {
        this.setState({
            userEmail: userEmail
        })
        console.log(this.state.userEmail);
        this.retrieveUserId(this.state.userEmail);
    }

    //we retrieve user id from a request to database
    retrieveUserId = (userEmail) => {
        fetch(`http://localhost:8000/api/user/${userEmail}`, { 
            method: 'get'
        }).then(res => {
            return res.json();
        }).then(resp => {
            console.log(JSON.stringify(resp));
            this.setState({
                userId: resp.id
            });
        })
    }

};

export default Container;