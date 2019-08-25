import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from './Home';

const HomeNav = createStackNavigator({
	
	Home:{
		screen:Home
	}

}, {
	navigationOptions:{
		header:null
	}
});

export default HomeNav;