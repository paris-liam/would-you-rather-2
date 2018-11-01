
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { handleInitialData } from './actions/shared';
import RatherApp from './components/RatherApp';
import LoginPage from './components/LoginPage';
class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <>
          <LoadingBar></LoadingBar>
          <div className='container'>
              {(this.props.loading === 0 && !this.props.authedUser) && <LoginPage/>}
							{(this.props.loading === 0 && this.props.authedUser) && <RatherApp/>}
          </div>
      </>

    )
  }

}

function mapStateToProps({authedUser,loadingBar}){
  return{
		authedUser,
    loading: loadingBar.default
  }
}

export default connect(mapStateToProps)(App)
