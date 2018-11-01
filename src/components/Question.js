import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import styled from 'styled-components';

const QuestionStyle = styled.div`
    display:grid;
    grid-row-gap:1vh;
    & > *{
        margin: 0 auto;
    }
    & > a{
        text-decoration:none;
        color:inherit;
    }
    & >  a > div{
        display:grid;
        img{
            width:50%;
            margin:0 auto;
        }
        p{
            text-align:center;
        }
    }
    & >  a > div:hover{
        background-color:grey;
    }
`
class Question extends Component {

    render () {
        const { question, author } = this.props;
        const { optionOne, timestamp, id } = question;
        const { name, avatarURL } = author;

        return (
            <QuestionStyle>
                <Link to={`/questions/${id}`} >
                <div>
                    <img alt={name} src={avatarURL} />
                    <p>{name} asks:<br/>
                        Would you rather {optionOne.text}...
                    </p>
                    <p>{formatDate(timestamp)}</p>
                </div>
                </Link>
            </QuestionStyle>
        );
    }
}

function mapStateToProps ({ questions, users }, { id }) {
    const question = questions[id];

    return {
        question: question
            ? question
            : null,
        author: question
            ? users[question.author]
            : null
    }
}

export default connect(mapStateToProps)(Question);