import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class Timer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            duration: props.timer.duration,
            isPaused: false
        }
    }
    msToMinAndSec(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }
    componentDidMount() {
        let interval = setInterval(() => {
            if (!this.state.isPaused) {
                if (this.state.duration > 0 ) {
                    let duration = this.state.duration - 1000;
                    this.setState({
                        duration
                    })
                }
                else {
                    clearInterval(interval)
                }
            }
        }, 1000)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.msToMinAndSec(this.state.duration)}</Text>
                <Text>{this.props.timer.duration}</Text>
                <Text>{this.props.timer.title}</Text>
                <Text>{(this.msToMinAndSec(this.props.timer.duration))}</Text>
                <TouchableOpacity
                    onPress={() => {this.setState({isPaused: !this.state.isPaused})}}
                ><Text>{this.state.isPaused ? "Play" : "Pause"}</Text></TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 0
    }
})