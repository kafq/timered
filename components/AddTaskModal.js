import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { LabeledComponent } from './LabeledComponent';
import ColorList from './ColorList';
import NewTimerDuration from './NewTimerDuration';
import { connect } from 'react-redux';
import { updateNewTimerTitle,
         addNewTimer } from '../actions/index';

class AddTaskModal extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.padded}>
                        <TextInput
                            style={styles.heading}
                            multiline
                            autoFocus
                            autoCorrect={false}
                            selectTextOnFocus
                            onChangeText={(text) => {this.props.updateNewTimerTitle(text)}}
                            value={this.props.newTimerTitle}/>
                    </View>
                    
                    <LabeledComponent label="Time">
                        <NewTimerDuration />
                    </LabeledComponent>
                    
                    <LabeledComponent label="Color">
                        <ColorList />
                    </LabeledComponent>
                
                </ScrollView>
                <TouchableOpacity
                    onPress={this.props.toggleCreateMode}
                    style={styles.cancelButton}>
                    <Text style={styles.secondaryText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props.addNewTimer(this.props.newTimerTitle, this.props.newTimerColor)
                        this.props.toggleCreateMode()
                    
                    }}
                    style={styles.addButton}>
                    <Text style={styles.activeTextLight}>Set timer</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect((state) => ({
    newTimerTitle: state.dataReducer.newTimerTitle,
    newTimerColor: state.dataReducer.newTimerColor
}), {
    updateNewTimerTitle,
    addNewTimer
})(AddTaskModal)

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 10,
        flex: 1,
        paddingTop: 52,
        backgroundColor: 'white'
    },
    heading: {
        fontSize: 28,
        fontWeight: '300',
        marginBottom: 32,
    },
    activeTextLight: {
        color: 'white',
        fontSize: 15
    },
    secondaryText: {
        color: '#B2B2B2'
    },
    padded: {
        paddingHorizontal: 46,
    },
    addButton: {
        height: 81,
        position: 'absolute',
        bottom: 0,
        right: 0,
        alignItems:'center',
        justifyContent: 'center',
        paddingHorizontal: 42,
        backgroundColor: '#1CD8E2'
    },
    cancelButton: {
        height: 81,
        position: 'absolute',
        bottom: 0,
        left: 0,
        alignItems:'center',
        justifyContent: 'center',
        paddingHorizontal: 42,
        backgroundColor: 'transparent'
    },
})