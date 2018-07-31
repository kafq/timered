import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const LabeledComponent = (props) => (
    <View style={styles.labelContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.labelText}>{props.label}</Text>
        </View>
        {props.children || null}
    </View>
)

const styles = StyleSheet.create({
    labelContainer: {
        paddingTop: 21,
    },
    textContainer: {
        paddingLeft: 46
    },
    labelText: {
        fontSize: 15,
        marginBottom: 16
    }
})