import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
const LeadUser = styled.div`
    display:grid;
    width:50%;
    text-align:center;
    img{
        width:40%;
        margin: 0 auto;
    }
    h3{
        font-weight:bold;
        color:blue;
    }
    margin:0 auto;
`
class LeaderBoardUser extends Component {

    render () {
        const { user } = this.props;
        const { name, avatarURL, answers, questions } = user;

        return (
            <LeadUser>
                    <img
                        alt={name}
                        src={avatarURL}
                    />
                        <h3>{name}</h3> <br />
                        Answered Questions: {Object.keys(answers).length} <br />
                        Created Questions: {questions.length} <br />}
            </LeadUser>
        );
    }
}

function mapStateToProps ({ users }, { id }) {

    return {
        user: users[id]
    }
}

export default connect(mapStateToProps)(LeaderBoardUser);