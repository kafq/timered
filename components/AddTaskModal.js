import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LabeledComponent } from './LabeledComponent';
import ColorList from './ColorList';

import Timer from './Timer';

export default class AddTaskModal extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.padded}>
                    <Text style={styles.heading}>Timers</Text>
                </View>
                
                <LabeledComponent label="Time">
                    <Timer timer={{title: 'Reset', duration: 12000}}/>
                </LabeledComponent>
                
                <LabeledComponent label="Color">
                    <ColorList colors={['#FFB379', '#FFE079', '#79EFFF', '#79B6FF', '#E679FF', '#FF799F', '#091929']}/>
                </LabeledComponent>

                
                <TouchableOpacity
                    onPress={this.props.toggleCreateMode}
                    style={styles.addButton}>
                    <Text style={styles.activeTextLight}>X</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}

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
    padded: {
        paddingHorizontal: 46,
    },
    addButton: {
        width: 81,
        height: 81,
        position: 'absolute',
        bottom: 0,
        right: 0,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#1CD8E2'
      },
})