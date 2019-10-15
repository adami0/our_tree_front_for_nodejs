import React from 'react';
import './Members.css';

class Members extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayFirstMember: [],
            arrayMembersWithoutFirst: [],
            membersList: [],
            membersListIndexed: [],
            messageToUser: '',
            relationshipList: [],
            activate: false,
            displayAddFirstMemberButton: false,
            displaySaveFirstMemberButton: false,
            displaySaveLinkedMember: false,
            firstname: "",
            lastname: "",
            birthdate: null,
            death_date: null,
            birthplace: "",
            death_place: "",
            text: "",
            member1_id: null,
            member2_id: null,
            relationshipType: 1,
            updateMemberBtnClicked: []
        };
    }

    render() {
        return (
            <div id="members-container">
                {this.state.messageToUser ? <div id="messageToUser" className="siimple-alert siimple-alert--error">{this.state.messageToUser}</div> : null}
                <input ref="1" type="text" className="siimple--mx-auto siimple-input input-member hide" placeholder="firstname*" value={this.state.firstname} required onChange={(evt) => this.handleFirstname(evt)}></input>
                <input ref="2" type="text" className="siimple--mx-auto siimple-input input-member hide" placeholder="lastname*" value={this.state.lastname} required onChange={(evt) => this.handleLastname(evt)}></input>
                <div ref="3" className="input-member input-date siimple--mx-auto hide">
                    <label className="siimple-label label-width">Birthdate: </label><input type="date" className="siimple-input" placeholder="birthdate" value={this.state.birthdate || ''} onChange={(evt) => this.handleBirthdate(evt)}></input>
                </div>
                <div ref="4" className="input-member input-date siimple--mx-auto hide">
                    <label className="siimple-label label-width">Death date:</label><input type="date" className="siimple-input" placeholder="death_date" value={this.state.death_date || ''} onChange={(evt) => this.handleDeathdate(evt)}></input>
                </div>
                <input ref="5" type="text" className="siimple--mx-auto siimple-input input-member hide" placeholder="birthplace" value={this.state.birthplace} onChange={(evt) => this.handleBirthplace(evt)}></input>
                <input ref="6" type="text" className="siimple--mx-auto siimple-input input-member hide" placeholder="death_place" value={this.state.death_place} onChange={(evt) => this.handleDeathplace(evt)}></input>
                <input ref="7" type="text" className="siimple--mx-auto siimple-textarea input-member hide" rows="3" placeholder="text" value={this.state.text} onChange={(evt) => this.handleText(evt)}></input>
                <div ref="8" className="siimple--mx-auto input-member hide">
                    <label className="siimple-label">Select type of relationship: </label>
                    <select value={this.state.relationshipType} className="siimple-select" onChange={(evt) => this.handleRelationshipType(evt)}>
                        <option value="1">Ascendant</option>
                        <option value="2">Sibling</option>
                        <option value="3">Spouse</option>
                        <option value="4">Descendant</option>
                    </select>
                </div>
                {this.state.displayAddFirstMemberButton ? <div id="addFirstMemberBtn" className="siimple--mx-auto siimple-btn siimple-btn--primary btn" onClick={() => this.displayFirstMemberInput()}>Add first member</div> : null}
                {this.state.displaySaveFirstMemberButton ? <div className="siimple--mx-auto input-member siimple-btn siimple-btn--primary" onClick={() => this.addMember()}>Save first member</div> : null}
                {this.state.arrayFirstMember.map(el => {
                    return (
                        <div key={el.id} className="siimple--mx-auto input-member siimple-card bg-first">
                            {this.state.updateMemberBtnClicked[el.id] ? <div className="siimple-card-body">
                                <input type="text" className="siimple--mx-auto siimple-input input-member" placeholder="firstname*" value={this.state.firstname} required onChange={(evt) => this.handleFirstname(evt)}></input>
                                <input type="text" className="siimple--mx-auto siimple-input input-member" placeholder="lastname*" value={this.state.lastname} required onChange={(evt) => this.handleLastname(evt)}></input>
                                <div className="input-member input-date siimple--mx-auto">
                                    <label className="siimple-label label-width">Birthdate: </label><input type="date" className="siimple-input" placeholder="birthdate" value={this.state.birthdate || ''} onChange={(evt) => this.handleBirthdate(evt)}></input>
                                </div>
                                <div className="input-member input-date siimple--mx-auto">
                                    <label className="siimple-label label-width">Death date:</label><input type="date" className="siimple-input" placeholder="death_date" value={this.state.death_date || ''} onChange={(evt) => this.handleDeathdate(evt)}></input>
                                </div>
                                <input type="text" className="siimple--mx-auto siimple-input input-member" placeholder="birthplace" value={this.state.birthplace} onChange={(evt) => this.handleBirthplace(evt)}></input>
                                <input type="text" className="siimple--mx-auto siimple-input input-member" placeholder="death_place" value={this.state.death_place} onChange={(evt) => this.handleDeathplace(evt)}></input>
                                <input type="text" className="siimple--mx-auto siimple-textarea input-member" rows="3" placeholder="text" value={this.state.text} onChange={(evt) => this.handleText(evt)}></input>
                                <div className="siimple--mx-auto siimple-btn siimple-btn--primary btn-update" onClick={() => this.saveUpdatedmember(el)}>Save modifications</div>
                                <div className="siimple--mx-auto siimple-btn siimple-btn--error btn-update" onClick={() => this.cancelUpdate(el)}>Cancel</div>
                            </div> : null}
                            {!this.state.updateMemberBtnClicked[el.id] ? <div className="siimple-card-body">
                                <div className="siimple-card-title">{el.firstname} {el.lastname}</div>
                                <div className="siimple-card-subtitle">{el.birthplace} {el.birthdate} - {el.death_place} {el.death_date} </div>
                                <div className="siimple-card-subtitle">{el.text}</div>
                                {this.state.displaySaveLinkedMember ?
                                    <div>
                                        <div className="siimple-btn siimple-btn--primary" onClick={() => this.addMember()}>Save linked member</div>
                                        <div className="siimple-btn siimple-btn--error" onClick={() => this.hideMemberInput()}>Cancel</div>
                                    </div>
                                    : <div className="btn-parent-grid">
                                        <div className="btn-center-grid siimple-btn siimple-btn--primary" onClick={() => this.displayMemberInput()}>Add linked member</div>
                                        <div className="btn-right-grid siimple-btn siimple-btn--warning siimple-btn--small" value={el.id} onClick={() => this.updateMember(el)}>Modify</div>
                                    </div>
                                }
                            </div> : null }
                        </div>
                    )
                })}
                {this.state.arrayMembersWithoutFirst.map(el => {
                    return (
                        <div key={el.id} className="siimple--mx-auto input-member siimple-card">
                            {this.state.updateMemberBtnClicked[el.id] ? <div className="siimple-card-body">
                                <input type="text" className="siimple--mx-auto siimple-input input-member" placeholder="firstname*" value={this.state.firstname} required onChange={(evt) => this.handleFirstname(evt)}></input>
                                <input type="text" className="siimple--mx-auto siimple-input input-member" placeholder="lastname*" value={this.state.lastname} required onChange={(evt) => this.handleLastname(evt)}></input>
                                <div className="input-member input-date siimple--mx-auto">
                                    <label className="siimple-label label-width">Birthdate: </label><input type="date" className="siimple-input" placeholder="birthdate" value={this.state.birthdate || ''} onChange={(evt) => this.handleBirthdate(evt)}></input>
                                </div>
                                <div className="input-member input-date siimple--mx-auto">
                                    <label className="siimple-label label-width">Death date:</label><input type="date" className="siimple-input" placeholder="death_date" value={this.state.death_date || ''} onChange={(evt) => this.handleDeathdate(evt)}></input>
                                </div>
                                <input type="text" className="siimple--mx-auto siimple-input input-member" placeholder="birthplace" value={this.state.birthplace} onChange={(evt) => this.handleBirthplace(evt)}></input>
                                <input type="text" className="siimple--mx-auto siimple-input input-member" placeholder="death_place" value={this.state.death_place} onChange={(evt) => this.handleDeathplace(evt)}></input>
                                <input type="text" className="siimple--mx-auto siimple-textarea input-member" rows="3" placeholder="text" value={this.state.text} onChange={(evt) => this.handleText(evt)}></input>
                                <div className="siimple--mx-auto siimple-btn siimple-btn--primary btn-update" onClick={() => this.saveUpdatedmember(el)}>Save modifications</div>
                                <div className="siimple--mx-auto siimple-btn siimple-btn--error btn-update" onClick={() => this.cancelUpdate(el)}>Cancel</div>
                            </div> : null}
                            {!this.state.updateMemberBtnClicked[el.id] ? <div className="siimple-card-body"> <div className="siimple-card-title">{el.firstname} {el.lastname}</div>
                                <div className="siimple-tip siimple-tip--primary">{el.description}</div>
                                <div className="siimple-card-subtitle">{el.birthplace} {el.birthdate} - {el.death_place} {el.death_date} </div>
                                <div className="siimple-card-subtitle">{el.text}</div>
                                <div className="btn-parent-grid">
                                    <div className="btn-pre-right-grid siimple-btn siimple-btn--warning siimple-btn--small" onClick={() => this.updateMember(el)}>Modify</div>
                                    <div className="btn-right-grid siimple-btn siimple-btn--error siimple-btn--small" onClick={() => this.deleteMember(el)}>Delete</div>
                                </div>
                            </div> : null}
                        </div>

                    )
                })
                }
            </div>
        );
    }

    //{this.state.membersListIndexed[78].id ? "true" : "false"}

    //{this.state.membersListIndexed[78] ? <div>{this.state.membersListIndexed[78]}</div>:<div>"no"</div> }


    componentDidMount() {
        console.log(this.state.membersListIndexed);
        this.retrievingRelationshipList();
        this.retrievingMembersList();
        console.log(this.props.tree_id);
    }

    //create list to manipulate easier 
    /*indexMemberList() {
        this.state.membersList.forEach(el => {
            this.state.membersListIndexed[el.id]=el;
        });
        console.log(this.state.membersListIndexed);
        this.setState({
            activate: true
        })
    }*/

    //displaying inputs to add a first member
    displayFirstMemberInput() {
        this.refs[1].classList.remove("hide");
        this.refs[2].classList.remove("hide");
        this.refs[3].classList.remove("hide");
        this.refs[4].classList.remove("hide");
        this.refs[5].classList.remove("hide");
        this.refs[6].classList.remove("hide");
        this.refs[7].classList.remove("hide");
        this.setState({
            displayAddFirstMemberButton: false,
            displaySaveFirstMemberButton: true
        })
    }

    //displaying inputs for a member linked to another member
    displayMemberInput() {
        this.refs[1].classList.remove("hide");
        this.refs[2].classList.remove("hide");
        this.refs[3].classList.remove("hide");
        this.refs[4].classList.remove("hide");
        this.refs[5].classList.remove("hide");
        this.refs[6].classList.remove("hide");
        this.refs[7].classList.remove("hide");
        this.refs[8].classList.remove("hide");
        this.setState({
            displaySaveLinkedMember: true
        });
        //if a modify button was hit before, it cancels it to not ave a conflict on variables
        /*this.state.updateMemberBtnClicked.forEach = (el) => {
            this.cancelUpdate(el);
        }*/
    }

    hideMemberInput() {
        this.refs[1].classList.add("hide");
        this.refs[2].classList.add("hide");
        this.refs[3].classList.add("hide");
        this.refs[4].classList.add("hide");
        this.refs[5].classList.add("hide");
        this.refs[6].classList.add("hide");
        this.refs[7].classList.add("hide");
        this.refs[8].classList.add("hide");
        this.setState({
            displaySaveLinkedMember: false
        })
    }

    //when first member added, inputs are hidden
    hideFirstMemberInput() {
        this.refs[1].classList.add("hide");
        this.refs[2].classList.add("hide");
        this.refs[3].classList.add("hide");
        this.refs[4].classList.add("hide");
        this.refs[5].classList.add("hide");
        this.refs[6].classList.add("hide");
        this.refs[7].classList.add("hide");
        this.setState({
            displaySaveFirstMemberButton: false
        })
    }

    addMember() {
        if (this.state.firstname !== '' && this.state.lastname !== '') {
            const member = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                birthdate: this.state.birthdate,
                death_date: this.state.death_date,
                birthplace: this.state.birthplace,
                death_place: this.state.death_place,
                text: this.state.text,
                tree_id: this.props.treeId,
                token: this.props.user_token
            };
            fetch(`http://localhost:8000/api/member/post_member`, {
                method: 'post',
                body: JSON.stringify(member),
                headers: { "Content-Type": "application/json" }
            }).then(res => {
                return res.json();
            }).then(resp => {
                //if a message was displayed, then we disable it
                this.setState({
                    messageToUser: ''
                })
                //check if this is first member added
                if (this.state.membersList.length === 0) {
                    this.hideFirstMemberInput();
                    this.retrievingMembersList();
                } else {
                    //prepare relationship query
                    this.getMember2Id();
                    this.hideMemberInput();
                }
                //reinitializing states
                this.setState({
                    firstname: "",
                    lastname: "",
                    birthdate: null,
                    death_date: null,
                    birthplace: "",
                    death_place: "",
                    text: ""
                })
            })
        } else {
            this.setState({
                messageToUser: 'please indicate firstname and lastname of the family member'
            })
        }
    }

    formatDate() {
        this.state.membersList.map(el => {
            //here we convert dates coming from db into human readable date format
            if (el.birthdate !== null && el.death_date !== null) {
                let dateFormattedBirthdate = new Date(el.birthdate);
                let formattedBirthdate = dateFormattedBirthdate.toLocaleDateString('fr-FR');
                el.birthdate = formattedBirthdate;
                let dateFormattedDeathdate = new Date(el.death_date);
                let formattedDeathDate = dateFormattedDeathdate.toLocaleDateString('fr-FR');
                el.death_date = formattedDeathDate;
                console.log('dd' + el.death_date);
                console.log('b' + el.birthdate);
                return el;
            } else if (el.death_date !== null) {
                let dateFormattedDeathdate = new Date(el.death_date);
                let formattedDeathDate = dateFormattedDeathdate.toLocaleDateString('fr-FR');
                el.death_date = formattedDeathDate;
                console.log('dd' + el.death_date);
                console.log('b' + el.birthdate);
                return el;
            } else if (el.birthdate !== null) {
                let dateFormattedBirthdate = new Date(el.birthdate);
                let formattedBirthdate = dateFormattedBirthdate.toLocaleDateString('fr-FR');
                el.birthdate = formattedBirthdate;
                return el;
            } else {
                return el;
            }
        });
        //we prepare the difference between first member and the next ones
        this.setState({
            arrayFirstMember: this.state.membersList.slice(0, 1),
            arrayMembersWithoutFirst: this.state.membersList.slice(1, this.state.membersList.length)
        })
    }

    getMember2Id() {
        const member = { firstname: this.state.firstname, lastname: this.state.lastname, tree_id: this.props.treeId };
        fetch('http://localhost:8000/api/member/get_member_by_firstname_lastname', {
            method: 'post',
            body: JSON.stringify(member),
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            return res.json()
        }).then(resp => {
            console.log(resp.rows[0].id);
            //preparing relationship query
            this.setState({
                member2_id: resp.rows[0].id
            });
            this.saveRelationship();
        })
    }



    //to store the value typed by the user in the input
    handleFirstname(evt) {
        this.setState({
            firstname: evt.target.value
        });
        console.log(this.state.firstname);
    }

    //to store the value typed by the user in the input
    handleLastname(evt) {
        this.setState({
            lastname: evt.target.value
        });
        console.log(this.state.lastname)
    }

    //to store the value typed by the user in the input
    handleBirthdate(evt) {
        this.setState({
            birthdate: evt.target.value
        });
        console.log(this.state.birthdate)
    }

    //to store the value typed by the user in the input
    handleDeathdate(evt) {
        this.setState({
            death_date: evt.target.value
        });
        console.log(this.state.death_date)
    }

    //to store the value typed by the user in the input
    handleBirthplace(evt) {
        this.setState({
            birthplace: evt.target.value
        });
    }

    //to store the value typed by the user in the input
    handleDeathplace(evt) {
        this.setState({
            death_place: evt.target.value
        });
    }

    handleRelationshipType(evt) {
        this.setState({
            relationshipType: evt.target.value
        });
        console.log(this.state.relationshipType);
    }

    //to store the value typed by the user in the input
    handleText(evt) {
        this.setState({
            text: evt.target.value
        });
    }






    //getting all relationships of the tree with information about members of these
    retrievingRelationshipList() {
        fetch(`http://localhost:8000/api/relationship/${this.props.treeId}`, {
            method: 'get'
        }).then(res => {
            return res.json();
        }).then(resp => {
            this.setState({
                relationshipList: resp
            });
            console.log(this.state.relationshipList);
        })
    }

    //get all members of a tree
    retrievingMembersList() {
        const data = { tree_id: this.props.treeId, token: this.props.user_token };
        fetch(`http://localhost:8000/api/member/all_by_tree`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            return res.json();
        }).then(resp => {
            console.log(resp);
            this.setState({
                membersList: resp
            });
            if (this.state.membersList.length === 0) {
                //if there is no result, we display a button to add the first member
                this.setState({
                    displayAddFirstMemberButton: true
                })
            } else {
                this.setState({
                    //here we prepare member and relationship queries
                    member1_id: resp[0].id
                })
            }
            this.formatDate();
        })
    }

    saveRelationship() {
        const relationship = { member1_id: this.state.member1_id, member2_id: this.state.member2_id, relationship_type_code: this.state.relationshipType, member1_role_code: 2, member2_role_code: 2 }
        fetch('http://localhost:8000/api/relationship/post_relationship', {
            method: 'post',
            body: JSON.stringify(relationship),
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            return res.json()
        }).then(resp => {
            console.log(resp);
            this.retrievingRelationshipList();
            this.retrievingMembersList();
        })
    }

    cancelUpdate = (el) => {
        console.log(el);
        console.log(this);
        let updateMemberBtnClickedArray = [];
        updateMemberBtnClickedArray[el.id] = false;
        this.setState({
            firstname: "",
            lastname: "",
            birthdate: null,
            death_date: null,
            birthplace: "",
            death_place: "",
            text: "",
            updateMemberBtnClicked: updateMemberBtnClickedArray
        })
        this.retrievingMembersList();

    }

    saveUpdatedmember(el) {
        if (this.state.firstname !== '' && this.state.lastname !== '') {
        console.log('memberToUpdateId' + this.state.memberToUpdateId);
        const member = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            birthdate: this.state.birthdate,
            death_date: this.state.death_date,
            birthplace: this.state.birthplace,
            death_place: this.state.death_place,
            text: this.state.text,
            tree_id: this.props.treeId,
            member_id: this.state.memberToUpdateId,
            token: this.props.user_token
        };
        fetch('http://localhost:8000/api/member/update_member', {
            method: 'put',
            body: JSON.stringify(member),
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            return res.json();
        }).then(resp => {
            this.cancelUpdate(el);
        })
    } else {
        this.setState({
            messageToUser: 'please indicate firstname and lastname of the family member'
        })
    }
    }

    updateMember = (el) => {
        console.log(el);
        console.log(this);
        let updateMemberBtnClickedArray = [];
        updateMemberBtnClickedArray[el.id] = true;
        this.setState({
            firstname: el.firstname,
            lastname: el.lastname,
            birthdate: el.birthdate,
            death_date: el.death_date,
            birthplace: el.birthplace,
            death_place: el.death_place,
            text: el.text,
            memberToUpdateId: el.id,
            updateMemberBtnClicked: updateMemberBtnClickedArray
        });
    }

    deleteMember = (el) => {
        if (window.confirm(`Delete ${el.firstname} ${el.lastname} from the family tree?`)) {
            console.log('el.id' + el.id);
            const data = { member_id: el.id, token: this.props.user_token };
            fetch('http://localhost:8000/api/member/delete_member', {
                method: 'delete',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            }).then(res => {
                return res.json();
            }).then(resp => {
                this.retrievingMembersList();
            })
        } else {
            return;
        }
    }
}

export default Members;