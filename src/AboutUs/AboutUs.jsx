import React from 'react';
import './AboutUs.css';
import './../Login/Login.css';
import './../Members/Members.css';
import '../../node_modules/siimple';

class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: 'ABOUT US'
        };
    }

    render() {
        return (
            <div id="login-container">
                <div id="grid-12" className="siimple-card-body bg-member-card">
                    <div id="page-name" className="siimple--rounded">{this.state.pageName}</div>
                    <div id="grid-text">ourTree web application lets you create your family tree and add members to this one.
                    
                    <p>How it works ?</p>

                    <p>First, you need to create an account and then, log in.</p>
                    <p>Once your account created and you being logged in, you will be able to create your family tree.</p>
                    <p>Once your tree created, you can access to your tree by clicking on it. After that, you will be able to create the first member of your tree</p>
                    <p>Be careful creating your first family tree member as, for now, he will be the central piece of your tree. It means that for every member (created after the first one), you will have to specify his link to the first one.</p>
                    <p>Don't hesitate to try our different functionalities.</p>
                    <p>ENJOY!</p>
                    </div>
                </div>
            </div>
        );
    }

   

};

export default AboutUs;