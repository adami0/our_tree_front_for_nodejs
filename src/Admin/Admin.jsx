import React from 'react';
import './../AboutUs/AboutUs.css';
import './../Login/Login.css';
import './../Members/Members.css';
import './../Admin/Admin.css'
import '../../node_modules/siimple';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: 'ADMIN PAGE',
            nbUsers: null,
            nbTrees: null,
            nbMembers: null
        };
    }

    render() {
        return (
            <div id="login-container">
                <div id="grid-12" className="siimple-card-body bg-member-card">
                    <div id="page-name" className="siimple--rounded">{this.state.pageName}</div>
                    <div className="grid-3-10 siimple-tip siimple-tip--warning">
                        Number of users: <span className="font-size-xl">{this.state.nbUsers}</span>
                    </div>
                    <div className="grid-3-10-next siimple-tip siimple-tip--success">
                        Number of family trees: <span className="font-size-xl">{this.state.nbTrees}</span>
                    </div>
                    <div className="grid-3-10-next2 siimple-tip siimple-tip--primary">
                        Number of added members: <span className="font-size-xl">{this.state.nbMembers}</span>
                    </div>
                    
                </div>
            </div>
        );
    }

    componentDidMount = () => {
        this.getNbOfUsers();
        this.getNbOfTrees();
        this.getNbOfMembers();

    }

    getNbOfUsers = () => {
        const data = { token: this.props.user_token };
        fetch(`http://localhost:8000/api/user/nb_users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            return res.json()
        }).then(resp => {
            this.setState({
                nbUsers: resp.rows[0].count
            })
        });
    }

    getNbOfTrees = () => {
        const data = { token: this.props.user_token };
        fetch(`http://localhost:8000/api/tree/nb_trees`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            return res.json()
        }).then(resp => {
            this.setState({
                nbTrees: resp.rows[0].count
            })
        });
    }

    getNbOfMembers = () => {
        const data = { token: this.props.user_token };
        fetch(`http://localhost:8000/api/member/nb_members`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            return res.json()
        }).then(resp => {
            this.setState({
                nbMembers: resp.rows[0].count
            })
        });
    }




};

export default Admin;