import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, Platform, FlatList, Picker } from 'react-native';
import { Notifications, Permissions } from 'expo';
import Timer from './components/Timer';

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newTimerMinDuration: 0,
      newTimerSecDuration: 0,
      timers: [
              {id: 1, title: 'Cook the pork', duration: 72000},
              {id: 2, title: 'Cook the beef', duration: 72000}]
    }
  }

  _handleButtonPress = () => {
    const localnotification = {
      title: 'Example Title!',
      body: 'This is the body text of the local notification',
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    };
    let sendAfterFiveSeconds = Date.now();
    sendAfterFiveSeconds += 10000;

    const schedulingOptions = { time: sendAfterFiveSeconds };
    Notifications.scheduleLocalNotificationAsync(
      localnotification,
      schedulingOptions
    );
  };
  listenForNotifications = () => {
    Notifications.addListener(notification => {
      if (notification.origin === 'received' && Platform.OS === 'ios') {
        Alert.alert(notification.title, notification.body);
      }
    });
  };

  createTimer = () => {
    let min = this.state.newTimerMinDuration;
    let sec = this.state.newTimerSecDuration;
    let ms = parseInt(min) * 60000 + parseInt(sec) * 1000
    let timers = this.state.timers.concat();
    timers.push({
      title: 'Test timer',
      duration: ms,
      deadline: Date.now() + ms,
    })

    this.setState({ timers })
  }

  countdownAll() {
    let timers = this.state.timers.concat()
    timers.forEach(item => {return{duration: duration -1000 ,...item}} )
  }

  componentWillMount() {
    getiOSNotificationPermission();
    Notifications.cancelAllScheduledNotificationsAsync()
    this.listenForNotifications();
  }
  render() {
    return (
      <View style={styles.container}>
      
      <Text style={styles.heading}>Create Timer</Text>      
      <View style={{height: 200, width: 200, flexDirection: 'row', flex: 1}}>
        <Picker
          selectedValue={this.state.newTimerMinDuration}
          style={{width: 100,
            height: 44, }}
          onValueChange={(itemValue, itemIndex) => this.setState({newTimerMinDuration: itemValue})}>
          <Picker.Item label="0" value="0" />          
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
        </Picker>
        <Picker
          selectedValue={this.state.newTimerSecDuration}
          style={{  width: 200,
            height: 44, }}
          onValueChange={(itemValue, itemIndex) => this.setState({newTimerSecDuration: itemValue})}>
          <Picker.Item label="0" value="0" />          
          <Picker.Item label="10" value="10" />
          <Picker.Item label="20" value="20" />
          <Picker.Item label="30" value="30" />
          <Picker.Item label="40" value="40" />
          <Picker.Item label="50" value="50" />
        </Picker>
      </View>
      <Text>Timer state: {this.state.newTimerMinDuration} mins {this.state.newTimerSecDuration} sec</Text>
      <Button
          title="Create"
          onPress={this.createTimer}
        />
      
      <View style={{flex: 1}}>
        <Button
          title="Send a notification in 5 seconds!"
          onPress={this._handleButtonPress}
        />

        <Text style={styles.heading}>Timers</Text>
        <FlatList
          data={this.state.timers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) =>
            <Timer
              timer={item}
            />
            }/>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700'
  },
  timerContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#F6F6F6'
  }
});
