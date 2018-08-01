import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import { connect } from 'react-redux';
import { updateNewTimerDuration } from '../actions/index';

class NewTimerDuration extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isTimePickerOn: false,
            minutes: 0,
            seconds: 30,
        }
    }

    msToMinAndSec(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }

    calculateDuration = () => {
        let duration = this.state.minutes * 60000 + this.state.seconds * 1000
        this.props.updateNewTimerDuration(duration)
    }
    
    renderPickerItems = (amount) => {
        let items = [];
        for (let i = amount-1; i >= 0; i--) {
            items.push((<Picker.Item key={i} label={i.toString()} value={i} />))
        }
        return items;
    }

    handleDurationChange = (value, name) => {
        this.setState({[name]: value}, () => {
            this.calculateDuration()
    })}

    render() {
        return (
            <View style={styles.timerContainer}>
                <View style={styles.container}>
    
                    <Text style={styles.timeText}>{this.msToMinAndSec(this.props.newTimerDuration)}</Text>
                    
                    <TouchableOpacity
                        onPress={() => {this.setState({isTimePickerOn: !this.state.isTimePickerOn})}}>
                        <Text>{this.state.isTimePickerOn ? 'Hide' : 'Set time'}</Text>
                    </TouchableOpacity>
                    <View style={styles.colorLabel}></View>
                </View>

                {this.state.isTimePickerOn ?
                    <View style={styles.timePickerContainer}>
                        <Picker
                            selectedValue={this.state.minutes}
                            style={{ width: 50 }}
                            itemStyle={{fontSize: 20, fontWeight: '300'}}
                            onValueChange={(itemValue, itemIndex) => {
                                this.handleDurationChange(itemValue, 'minutes')
                            }}>
                            
                            { this.renderPickerItems(60, 'minutes') }
                            
                        </Picker>
                        <Text style={styles.timeLabelText}>Min</Text>
                        <Picker
                            selectedValue={this.state.seconds}
                            style={{ width: 50 }}
                            onValueChange={(itemValue, itemIndex) => {
                                this.handleDurationChange(itemValue, 'seconds')
                            }}>
                            { this.renderPickerItems(60, 'seconds') }
                            
                        </Picker>
                        <Text style={styles.timeLabelText}>Sec</Text>
                    </View> : null}
            </View>
        )
    }
}

export default connect((state) => ({
    newTimerDuration: state.dataReducer.newTimerDuration
}), {
    updateNewTimerDuration
})(NewTimerDuration)

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
        height: 81,
        backgroundColor: '#F6F6F6',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    timePickerContainer: {
        paddingLeft: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeText: {
        fontSize: 20,
        lineHeight: 40,
        fontWeight: '300'
    },
    timeLabelText: {
        fontSize: 18,
        lineHeight: 30,
        marginRight: 20
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