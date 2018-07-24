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
            <View style={styles.timerContainer}>
                <View style={styles.container}>
    
                    <Text style={styles.timeText}>{this.msToMinAndSec(this.state.duration)}</Text>
                    
                    <Text>{this.props.timer.title}</Text>
                    {/* <TouchableOpacity
                        onPress={() => {this.setState({isPaused: !this.state.isPaused})}}>
                        <Text>{this.state.isPaused ? "Play" : "Pause"}</Text>
                    </TouchableOpacity> */}
                    <View style={styles.colorLabel}></View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    timerContainer: {
        paddingLeft: 46
    },
    container: {
        position: 'relative',
        paddingVertical: 20,
        paddingLeft: 24,
        paddingRight: 46,
        marginVertical: 3,
        backgroundColor: '#F6F6F6',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    timeText: {
        fontSize: 20,
        lineHeight: 40,
        fontWeight: '300'
    },
    titleText: {
        fontSize: 15,
        lineHeight: 26,
        textAlign: 'right',
        fontWeight: '300'
    },
    colorLabel: {
        width: 9,
        height: 9,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'lightblue'
    }
})