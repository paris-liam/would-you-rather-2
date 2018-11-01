import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeaderBoardUser from './LeaderBoardUser';

class LeaderBoard extends Component {
    render () {

        return (
            <div style={{display:'grid',gridTemplateColumns:'auto',gridRowGap:'2vh'}}>
                <h2 style={{textDecoration:'underline', margin:'0 auto',width: "50%", textAlign: 'center'}}>
                    LeaderBoard
                </h2>
                {this.props.userIDs.map((id) => (
                    <LeaderBoardUser key={id} id={id} />
                ))}
            </div>
        );
    }
}

function mapStateToProps ({ users }) {
    //sort UserIDs by the score for each user, desc
    const sortedUserIDs = Object.keys(users).sort((id1, id2) => {
        const scoreA = Object.keys(users[id1].answers).length + users[id1].questions.length;
        const scoreB = Object.keys(users[id2].answers).length + users[id2].questions.length;

        return scoreB - scoreA;
    });

    return {
        userIDs: sortedUserIDs
    }
}

export default connect(mapStateToProps)(LeaderBoard);