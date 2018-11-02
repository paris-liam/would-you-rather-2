import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Fragment } from 'react';
import WouldYouRatherDashboard from './WouldYouRatherDashboard';
import SingleQuestionPage  from './SingleQuestionPage'
import LeaderBoard from './LeaderBoard'
import PageNotFound from './PageNotFound'
import Nav from './Nav'
import NewRatherPage from './NewRatherPage';
const RatherApp = () =>(
<div>
	<Router>
		<Fragment>
			<Nav />
			<Switch>
				<Route path='/' exact component={WouldYouRatherDashboard} />
				<Route path='/questions/:id' component={SingleQuestionPage} />
				<Route path='/add' component={NewRatherPage} />
				<Route path='/leaderboard' component={LeaderBoard} />
				<Route component={PageNotFound} />
			</Switch>
		</Fragment>
	</Router>
</div>
)
export default RatherApp;