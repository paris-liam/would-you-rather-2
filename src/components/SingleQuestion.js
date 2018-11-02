import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddAnswer } from '../actions/questions';
import { formatDate } from '../utils/helpers';
import PageNotFound from './PageNotFound';
import styled from 'styled-components';
const QForm = styled.form`
    display:grid;
    & > *{
        margin: 0 auto;
    }
    img{
        width:40%;
    }
    font-family:serif;
    button{
        border: 2px solid black;
        width:30%;
        margin-bottom:2vh;
    }

`
class SingleQuestion extends Component {
    state={errorMessage:''}
    handleSubmit = (id, e) => {
          const answer = this.form.answer.value;
          const { dispatch } = this.props;
          console.log(answer);
        if(answer !== 'optionOne' && answer !== 'optionTwo'){
            e.preventDefault();
            this.setState({errorMessage:'please pick an Answer'})
        }
        else{
            e.preventDefault();
            dispatch(handleAddAnswer(id, answer));
        }

    }

    render () {
        const { question, author, autherUserAnsweres, authedUser } = this.props;
        if (question === null) {
            return <PageNotFound />;
        }
        const { optionOne, optionTwo, timestamp, id } = question;
        const { name, avatarURL } = author;
        const isAnswered = autherUserAnsweres.hasOwnProperty(id) ? true : false;
        const totalVotes = optionOne.votes.length + optionTwo.votes.length;

        return (
            <div>
                <QForm onSubmit={(e) => this.handleSubmit(id, e)} ref={(f) => this.form = f}>
                        <img
                            alt={name}
                            src={avatarURL}
                        />
						<div>
                        {name} asks:
                        <p>Would you rather...</p><br />
                        </div>
                        {!isAnswered ?(
                            <div>
                            <p style={{color:'red'}}>{this.state.errorMessage}</p>
                            <input type="radio" value='optionOne' name="answer" /> {optionOne.text}<br />
                            <input type="radio" value='optionTwo' name="answer" /> {optionTwo.text}<br />
                        <p>Asked at {formatDate(timestamp)}</p>

                        <button type='submit'>Vote</button></div>):(<ul>
                        <li>
                            {optionOne.votes.includes(authedUser)
                                ? <span style={{color:'green'}}>{optionOne.text}</span>
                                : optionOne.text}
                        </li>
                        chosen by {optionOne.votes.length} out of {totalVotes} users <br />
                        {Math.round(optionOne.votes.length / totalVotes * 100)}% <br />
                        <li>
                            {optionTwo.votes.includes(authedUser)
                                ? <span style={{color:'green'}}>{optionTwo.text}</span>
                                : optionOne.text}
                        </li>
                        chosen by {optionTwo.votes.length} out of {totalVotes} users <br />
                        {Math.round(optionTwo.votes.length / totalVotes * 100)}%
                    </ul>)}
                </QForm>
            </div>
        );
}
}

function mapStateToProps ({ questions, users, authedUser }, { id }) {
    const question = questions[id];
    const autherUserAnsweres = users[authedUser].answers;

    return {
        question: question ? question: null,
        author: question ? users[question.author]: null,
        authedUser,
        autherUserAnsweres
    }
}

export default connect(mapStateToProps)(SingleQuestion);
