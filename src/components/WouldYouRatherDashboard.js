import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Question from './Question'
const QuestionSwitch = styled.div`
    display:grid;
    justify-items:center;
    width:40%;
    margin:0 auto;
    grid-template-columns:auto auto auto;
    padding-top:2vh;
    margin-bottom:2vh;
    button{
        border:1px solid black;
        background-color:blue;
        color:white;
    }
    button:active{
        background-color:green;
    }
    button:focus{
        background-color:green;
    }
    button:hover{
        background-color:green;
    }
`
const QuestionList = styled.div`
    display:grid;
    grid-template-columns:auto;
    grid-row-gap:2vh;
`
class WouldYouRatherDashboard extends Component {
    constructor(props){
        super(props);
        this.state={
                answered:false,
                unanswered:false,
                both:true,
        }
        this.changeList = this.changeList.bind(this);
    }
    changeList(type){
        switch (type) {
            case 'Unanswered':
                this.setState({
                    answered:false,
                    unanswered:true,
                    both:false,
                })
                break;
            case 'Answered':
                this.setState({
                    answered:true,
                    unanswered:false,
                    both:false,
                })
                break;
            case 'Both':
                this.setState({
                    answered:false,
                    unanswered:false,
                    both:true,
                })
                break;

            default:
                break;
        }
    }
    render () {
        const { answeredQuestionIds, unansweredQuestionIds,  } = this.props;
        const bothIds = unansweredQuestionIds.concat(answeredQuestionIds);

        return (
            <div>
                <QuestionSwitch >
                    <button onClick={()=>this.changeList('Unanswered')}>Unanswered Questions</button>
                    <button onClick={()=>this.changeList('Both')}>Both</button>
                    <button onClick={()=>this.changeList('Answered')}>Answered Questions</button>
                </QuestionSwitch>
                {this.state.both &&
                    <QuestionList>{
                        bothIds.length > 0 ? bothIds.map((questionId) =>(<Question key={questionId} id={questionId}></Question>)) : <p>no questions, add some</p>
                    }</QuestionList>
                }
                {this.state.unanswered &&
                    <QuestionList>{
                        unansweredQuestionIds.length > 0 ? unansweredQuestionIds.map((questionId) =>(<Question key={questionId} id={questionId}></Question>)) : <p>no Unanswered questions, add some</p>
                    }</QuestionList>
                }
                {this.state.answered &&
                    <QuestionList>{
                        answeredQuestionIds.length > 0 ? answeredQuestionIds.map((questionId) =>(<Question key={questionId} id={questionId}></Question>)) : <p>no Answered questions, answer some</p>
                    }</QuestionList>
                }
            </div>
        );
	}
}

function mapStateToProps ({ authedUser, questions, users }) {
    const answeredQuestionIds = Object.keys(questions)
        .filter((id) => users[authedUser].answers.hasOwnProperty(id))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

    const unansweredQuestionIds = Object.keys(questions)
        .filter((id) => !users[authedUser].answers.hasOwnProperty(id))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

    return {
        answeredQuestionIds,
        unansweredQuestionIds
    }
}

export default connect(mapStateToProps)(WouldYouRatherDashboard);