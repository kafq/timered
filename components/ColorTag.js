import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions

class ColorTag extends Component {
    componentDidMount() {
        this.props.getData(); //call our action
        console.log(this.props.colors)
    }
    state = {
        isSelected: false
    }

    toggleSelected = () => {
        console.log(this.state)
        this.setState({
            isSelected: !this.state.isSelected
        })
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.toggleSelected}
                style={[styles.colorSquare, {backgroundColor: this.props.color}]}>
                { this.state.isSelected ? <View style={styles.selected}/> : null}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    colorSquare: {
        position: 'relative',
        height: 81,
        width: 81,
        marginHorizontal: 5
    },
    selected: {
        position: 'absolute',
        height: 9,
        width: 9,
        bottom: 5,
        right: 5,
        backgroundColor: 'white',
        zIndex: 15
    }
})


function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        data: state.dataReducer.data
    }
  }
  
  // Doing this merges our actions into the component’s props,
  // while wrapping them in dispatch() so that they immediately dispatch an Action.
  // Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }
  
  //Connect everything
  export default connect((state) => ({
    colors: state.dataReducer.labelColors
  }), mapDispatchToProps)(ColorTag);
  