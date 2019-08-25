import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight} from 'react-native';

export default class SearchBoxItem extends Component {

	constructor(props){
		super(props);
		this.state = {};

		this.itemClick = this.itemClick.bind(this);
	}

	itemClick(){
		this.props.dataClick(this.props.data);
	}

	render(){
		return (
			<TouchableHighlight style={styles.itemArea} onPress={this.itemClick} underlayColor="#cccccc">
				<Text style={styles.itemTxt}>{this.props.data.label}</Text>
			</TouchableHighlight>
		);
	}

}

const styles = StyleSheet.create({
	itemArea:{
		height:40,
		justifyContent:'center',
		padding:10
	},
	itemTxt:{
		fontSize:18
	}

});