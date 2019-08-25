import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/AuthActions';

export class Preload extends Component {

	constructor(props){
		super(props);
		this.state = {};

		this.verifyStatus = this.verifyStatus.bind(this);
	}

	componentDidMount(){
		this.props.checkLogin();
	}

	componentDidUpdate(){
		this.verifyStatus();
	}

	verifyStatus(){
		// Verificar Status Users
		switch(this.props.status){
			case 1:
				// Manda para a Home
				this.props.navigation.dispatch(StackActions.reset({
					index:0,
					actions:[
						NavigationActions.navigate({'routeName': 'HomeNav'})
					]
				}));
				break;
			case 2:
				// Manda para Login
				this.props.navigation.dispatch(StackActions.reset({
					index:0,
					actions:[
						NavigationActions.navigate({'routeName': 'Login'})
					]
				}));
				break;
		}

	}

	render(){
		return (
			<View style={styles.container}>
				<Text>Carregando....</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	}
});

const mapStateToProps = (state) => {
	return {
		status:state.auth.status
	};
}

const PreloadConnect = connect(mapStateToProps, { checkLogin })(Preload);
export default PreloadConnect;