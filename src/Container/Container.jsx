import React from 'react';
import Navbar from '../Navbar/Navbar'
import Login from '../Login/Login'
import Trees from '../Trees/Trees'
import Members from '../Members/Members'
import AboutUs from '../AboutUs/AboutUs'
import Admin from '../Admin/Admin'
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
            about_us_page: false,
            admin_page: false,
            user_token: null
        };
    }

    render() {
        return (
            <div id="container">
                {this.state.userEmail ? <Navbar user_token={this.state.user_token} admin_page={this.state.admin_page} parentCallback={this.makeTreeIdNull} parentCallback2={this.makeStatusFalse} parentCallback3={this.showAboutUsComponent} parentCallback5={this.showAdminPage}></Navbar> : <Navbar parentCallback3={this.showAboutUsComponent} parentCallback4={this.showLoginComponent}></Navbar>}
                {this.state.about_us_page ? <AboutUs></AboutUs>
                    : [(this.state.authStatus !== 'true' || this.state.userIdStatus !== 'true') ?
                        <Login key='1' parentCallback={this.checkAuthStatus} parentCallback3={this.retrieveUserToken} parentCallback2={this.retrieveUserEmail} parentCallback4={this.showAdminPage}></Login>
                        : [this.state.admin_page ? <Admin key='4' user_token={this.state.user_token}></Admin>
                            : [this.state.treeId ?
                                <Members key='3' user_token={this.state.user_token} treeId={this.state.treeId}></Members>
                                : <Trees key='2' user_token={this.state.user_token} parentCallback3={this.retrieveTreeId} userId={this.state.userId} userEmail={this.state.userEmail}></Trees>]]]}
            </div>
        );
    }

    componentDidMount = () => {
        console.log(this);
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

    //coming from child component members, make appear tree component and make disappear member component AND about us page
    makeTreeIdNull = (treeIdNull) => {
        this.setState({
            treeId: treeIdNull,
            about_us_page: false,
            admin_page: false
        })
    }

    //coming from chil component navbar, executed when clicked on log out
    makeStatusFalse = () => {
        this.setState({
            authStatus: false,
            userIdStatus: false,
            userEmail: false,
            about_us_page: false,
            treeId: false,
            user_token: null
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
        const user = { token: this.state.user_token, email: this.state.userEmail };
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

    showAboutUsComponent = () => {
        this.setState({
            about_us_page: true
        })
    }

    showAdminPage = () => {
        this.setState({
            admin_page: true
        })
    }

    showLoginComponent = () => {
        this.setState({
            about_us_page: false
        })
    }

};

export default Container;