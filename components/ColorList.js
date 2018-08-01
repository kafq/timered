import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import ColorTag from './ColorTag';
import { connect } from 'react-redux' 

class ColorList extends Component {
    
    render() {
        return (
            <FlatList
                data={this.props.colors}
                style={styles.container}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                renderItem={({item}) => (
                    <ColorTag key={item.id} color={item}/>
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

export default connect((state)=>({
    colors: state.dataReducer.labelColors
}))(ColorList)