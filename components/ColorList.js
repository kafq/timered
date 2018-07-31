import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import ColorTag from './ColorTag';

export default class ColorList extends Component {
    
    render() {
        return (
            <FlatList
                data={this.props.colors}
                style={styles.container}
                extraData={this.state}
                horizontal
                renderItem={({item}) => (
                    <ColorTag color={item}/>
                )}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 41
    }
})