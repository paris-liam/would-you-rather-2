import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearAuthedUser } from '../actions/authedUser';
import styled from 'styled-components';
const Name = styled.div`
	display:grid;
	grid-template-rows:auto;
	grid-template-columns: 1fr 1fr;
	& > div{
		display:grid;
		grid-template-columns:auto;
		text-align:right;
		padding-right:10px;
		button{
			width:10%;
			text-align:right;
			border:2px solid black;
			border-radius:20px;
			margin: 0 0 0 auto;
		}

	}
`;
const Links = styled.div`
	padding-left:10px;
	display:grid;
	grid-template-rows:auto;
	grid-template-columns: auto auto auto;
	text-align:left;
	width:50%;
	& > a{
		color:grey;
		text-decoration:none;
		&:hover{
			color:blue;
		}
		&.active{
			color:blue;
		}
	}
`;
function Nav (props) {
	const { user, dispatch } = props;

	const handleLogout = () => {
		dispatch(clearAuthedUser());
	}

	return (
		<Fragment>
			<Name>
				<h2>Would You Rather Application</h2>
					<div><h5>{user.name}</h5>
				<button onClick={handleLogout}>
					Logout
				</button>
				</div>
			</Name>
			<Links>
					<NavLink to='/' exact activeClassName='active'>
							WouldYouRatherDashboard
					</NavLink>
					<NavLink to='/add' activeClassName='active'>
							New Question
					</NavLink>
					<NavLink to='/leaderboard' activeClassName='active'>
						Leaderboard
					</NavLink>
			</Links>
		</Fragment>
	)
}

function mapStateToProps({ users, authedUser}) {
	return {
		user: users[authedUser]
	}
}

export default connect(mapStateToProps)(Nav);