import React, { Component } from 'react';
import SingleQuestion from './SingleQuestion';
class SingleQuestionPage extends Component {
    render () {
        const Qid = this.props.match.params.id;
        return <SingleQuestion id={Qid} />;
    }
}
export default SingleQuestionPage;