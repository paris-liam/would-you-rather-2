import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import styled from 'styled-components';
const QuestionForm = styled.form`
    display:grid;
    *{
        margin:0 auto;
        text-align:center;
    }
    & > div{
        display:grid;
        grid-row-gap:2vh;
        & > input{
            border:2px black solid;
        }
        & > button{
            border-radius:20px;
            color:white;
            background-color:green;
        }
    }
`
class NewRatherPage extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
    }

    handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        const { optionOne, optionTwo } = this.state;
        const { dispatch } = this.props;

        e.preventDefault();

		this.setState({
            optionOne: '',
            optionTwo: '',
            toWouldYouRatherDashboard: true
        },
       () => dispatch(handleAddQuestion(optionOne, optionTwo)));
    }

    render () {
        const { optionOne, optionTwo } = this.state;

        return (
            <QuestionForm onSubmit={this.handleSubmit}>
            <h2>New Question</h2>
                <div>
                        Would you rather...<br />
                        <input
                            name='optionOne'
                            type='text'
                            value={optionOne}
                            onChange={this.handleInputChange} />
                        <p>OR</p>
                        <input
                            name='optionTwo'
                            type='text'
                            value={optionTwo}
                            onChange={this.handleInputChange} />
                        <button
                            onClick={this.handleSubmit}
                            type='submit'
                            disabled={(optionOne === '') || (optionTwo==='')}>
                            Submit
                        </button>
                </div>
            </QuestionForm>
        );
    }
}



export default connect()(NewRatherPage);