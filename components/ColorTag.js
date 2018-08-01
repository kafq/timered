import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { updateNewTimerColor } from '../actions';

class ColorTag extends Component {
    
    state = {
        isSelected: false
    }

    toggleSelected = () => {
        this.setState({
            isSelected: !this.state.isSelected
        }, () => {
            if (this.state.isSelected) this.props.updateNewTimerColor(this.props.color)
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

  //Connect everything
  export default connect(() => ({

  }), {
      updateNewTimerColor
  })(ColorTag);
  