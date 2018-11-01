import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import styled from 'styled-components';
const LoginContainer = styled.div`
    width:50%;
    margin:20% auto;
    border:2px solid black;
    font-family:'Courier New', Courier, monospace;
    text-align:center;
`
const LoginList = styled.div`
display:grid;
grid-row-gap:20px;
width:30%;
margin: 10px auto;
    button{
        border-radius: 30px;
        background-color:black;
        color:white;
        font-family:'Courier New', Courier, monospace;
    }
    button:hover{
        background-color:green;
    }
`
class LoginPage extends Component {
    handleSubmit = (e) => {
        const userID = e.target.value;
        const { dispatch } = this.props;
        e.preventDefault();
        dispatch(setAuthedUser(userID));
    }

    render () {
        const { userNames } = this.props;
        return (
            <LoginContainer>
                <p>Login to the Would You Rather App</p>
                <LoginList>
                {userNames.map((user) => <button value={user.id} key={user.id} onClick={this.handleSubmit}>{user.name}</button>)}
                </LoginList>
            </LoginContainer>
        );
    }
}

function mapStateToProps ({ users }) {

    return {
        userNames: Object.keys(users).map((id) => ({
            id,
            name: users[id].name
        }))
    }
}

export default connect(mapStateToProps)(LoginPage);