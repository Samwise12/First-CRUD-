import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import GamesPage from './GamesPage'
import GameFormPage from './GameFormPage'

export default () => {
	return(
		<div className="ui container">
			<div className="ui three item menu">
		<NavLink className="item" exact to="/">Home</NavLink>
		<NavLink className="item" exact to="/games">Games</NavLink>
		<NavLink className="item" exact to="/games/new">Add New Game</NavLink>
			</div>
			<Route exact path='/' />
			<Route exact path='/games' component={GamesPage} />
			<Route exact path='/games/new' component={GameFormPage} />
			<Route path='/game/:_id' component={GameFormPage} />
		</div>
		)
};

//to Routes.js


