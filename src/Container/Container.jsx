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
            userIdStatus: '',
            treeId: '',
            user_token: null
        };
    }

    render() {
        return (
            <div id="container">
                <Navbar user_token={this.state.user_token} parentCallback={this.makeTreeIdNull}></Navbar>
                {(this.state.authStatus !== 'true' || this.state.userIdStatus !== 'true') ? 
                <Login key='1' parentCallback = {this.checkAuthStatus} parentCallback3 = {this.retrieveUserToken} parentCallback2 = {this.retrieveUserEmail}></Login>
                :[this.state.treeId ?
                    <Members key='3' user_token={this.state.user_token} treeId={this.state.treeId}></Members> 
                    :<Trees key='2' user_token={this.state.user_token} parentCallback3 = {this.retrieveTreeId} userId = {this.state.userId} userEmail = {this.state.userEmail}></Trees>]}
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

    makeTreeIdNull = (treeIdNull) => {
        this.setState({
            treeId: treeIdNull
        })
    }

    //we retrieve user email from the child component Login
    retrieveUserEmail = (userEmail) => {
        this.setState({
            userEmail: userEmail
        })
        console.log(this.state.userEmail);
    }

    //we retrieve user id from a request to database to be able to select trees from this user
    retrieveUserId = (userEmail) => {
        const user = {token: this.state.user_token, email: this.state.userEmail};
        fetch(`http://localhost:8000/api/user/email/${userEmail}`, { 
            method: 'post',
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            return res.json();
        }).then(resp => {
            console.log(JSON.stringify(resp));
            this.setState({
                userId: resp.id,
                userIdStatus: 'true'
            });
        })
    }

    retrieveUserToken = (user_token) => {
        this.setState({
            user_token: user_token
        })
        this.retrieveUserId(this.state.userEmail);        
    }

};

export default Container;