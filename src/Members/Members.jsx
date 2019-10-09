import React from 'react';
import './Members.css';

class Members extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            member2_id: null
        };
    }

    render() {
        return (
            <div id="members-container">
                {this.state.messageToUser ? <div id="messageToUser" className="siimple-alert siimple-alert--error">{this.state.messageToUser}</div> : null}
                <input ref="1" type="text" className="siimple-input hide" placeholder="firstname*" required onChange={(evt) => this.handleFirstname(evt)}></input>
                <input ref="2" type="text" className="siimple-input hide" placeholder="lastname*" required onChange={(evt) => this.handleLastname(evt)}></input>
                <input ref="3" type="text" className="siimple-input hide" placeholder="birthdate" onChange={(evt) => this.handleBirthdate(evt)}></input>
                <input ref="4" type="text" className="siimple-input hide" placeholder="death_date" onChange={(evt) => this.handleDeathdate(evt)}></input>
                <input ref="5" type="text" className="siimple-input hide" placeholder="birthplace" onChange={(evt) => this.handleBirthplace(evt)}></input>
                <input ref="6" type="text" className="siimple-input hide" placeholder="death_place" onChange={(evt) => this.handleDeathplace(evt)}></input>
                <input ref="7" type="text" className="siimple-textarea hide" rows="3" placeholder="text" onChange={(evt) => this.handleText(evt)}></input>
                <div ref="8" className="hide">
                    <label className="siimple-label">Select type of relationship: </label>
                    <select className="siimple-select">
                        <option selected>Brotherhood</option>
                        <option>Ascendant</option>
                        <option>Descendant</option>
                        <option>Union</option>
                    </select>
                </div>
                {this.state.displayAddFirstMemberButton ? <div className="siimple-btn siimple-btn--primary" onClick={() => this.displayFirstMemberInput()}>Add first member</div> : null}
                {this.state.displaySaveFirstMemberButton ? <div className="siimple-btn siimple-btn--primary" onClick={() => this.addMember()}>Save first member</div> : null}
                {this.state.membersList.map(el => {
                    return (
                        <div key={el.id} className="siimple-card">
                            <div className="siimple-card-body">
                                <div className="siimple-card-title">{el.firstname} {el.lastname}</div>
                                <div className="siimple-card-subtitle">{el.birthplace} {el.death_place}</div>
                                {el.text}
                                {this.state.displaySaveLinkedMember ? <div className="siimple-btn siimple-btn--primary" onClick={() => this.addMember()}>Save linked member</div> : <div className="siimple-btn siimple-btn--primary" onClick={() => this.displayMemberInput()}>Add linked member</div>}
                            </div>
                        </div>
                    )
                })}
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
                tree_id: this.props.treeId
            };
            fetch(`http://localhost:8000/api/member/post_member`, {
                method: 'post',
                body: JSON.stringify(member),
                headers: { "Content-Type": "application/json" }
            }).then(res => {
                return res.json();
            }).then(resp => {
                //check if this is first member added
                if (this.state.membersList.length === 0) {
                    this.retrievingMembersList();
                    this.hideFirstMemberInput();
                } else {
                    //prepare relationship query
                    this.getMember2Id();
                }
            })
        } else {
            this.setState({
                messageToUser: 'please indicate firstname and lastname of the family member'
            })
        }
    }

    getMember2Id() {
        const member = {firstname: this.state.firstname, lastname: this.state.lastname, tree_id: this.props.treeId};
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
        fetch(`http://localhost:8000/api/member/all/${this.props.treeId}`, {
            method: 'get'
        }).then(res => {
            return res.json();
        }).then(resp => {
            console.log(resp);
            this.setState({
                membersList: resp
            });
            if (this.state.membersList.length === 0) {
                this.setState({
                    displayAddFirstMemberButton: true
                })
            } else {
                this.setState({
                    //here we prepare relationship queries
                    member1_id: resp[0].id
                })
            }
            //this.indexMemberList();
        })
    }

    saveRelationship() {
        const relationship = {member1_id: this.state.member1_id, member2_id: this.state.member2_id, relationship_type_code: 2, member1_role_code: 2, member2_role_code: 2}
        fetch('http://localhost:8000/api/relationship/post_relationship', {
            method: 'post',
            body: JSON.stringify(relationship),
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            return res.json()
        }).then(resp => {
            console.log(resp);
            this.retrievingRelationshipList();
        })
    }
}

export default Members;