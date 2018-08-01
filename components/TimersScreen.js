import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert, Platform, FlatList, Picker } from 'react-native';
import { Notifications, Permissions } from 'expo';
import Timer from './Timer';
import AddTaskModal from './AddTaskModal';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
}

class TimersScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isCreateModeOn: false,

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

  toggleCreateMode = () => {
    this.setState({isCreateModeOn: !this.state.isCreateModeOn})
  }

  pauseTimer = (id) => {
    console.log('Pausing timer ' + id)
    let timers = this.state.timers.concat()
    timers.forEach(timer => timer.id === id ? timer.isPaused = !timer.isPaused : timer)

    this.setState({
      timers
    })
  }

  componentWillMount() {
    getiOSNotificationPermission();
    //Notifications.cancelAllScheduledNotificationsAsync()
    this.listenForNotifications();
  }
  render() {
    return (
      <View style={[styles.container, {position: 'relative'}]}>
       
        {
          this.state.isCreateModeOn ? 
            <AddTaskModal
              toggleCreateMode={this.toggleCreateMode}
            /> : null
        }
          <View style={styles.padded}>
            <Text style={styles.heading}>Timers</Text>
          </View>
          {/* <FlatList
            data={this.state.timers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) =>
              <Timer

                timer={item}
              />
            } /> */}
          <SwipeListView
            useFlatList
            keyExtractor={(item, index) => index.toString()}
            style={{position: 'relative'}}
            data={this.props.timers}
            renderItem={ (rowData, rowMap) => (
                  <Timer
                  timer={rowData.item}/>

               
            )}
            renderHiddenItem={ (rowData, rowMap) => (
              <View
              style={{position: 'absolute', right: 0, marginVertical: 3, flexDirection: 'row'}}>
                  
                  <TouchableOpacity style={styles.stopButton}>
                    <Text style={{color: 'white'}}>S</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                  onPress={() => {this.pauseTimer(rowData.item.id)}}
                  style={styles.pauseButton}>
                    <Text style={{color: 'white'}}>{rowData.item.isPaused ? 'R' : 'P'}</Text>
                  </TouchableOpacity>

              </View>
          )}

            previewRowKey={'X'}
            rightOpenValue={-162}
          />
        
        <TouchableOpacity
        onPress={this.toggleCreateMode}
        style={styles.addButton}>
          <Text style={styles.activeTextLight}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect((state)=>({
    timers: state.dataReducer.timers
}))(TimersScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 52,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 32,
  },
  timerContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#F6F6F6'
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
  activeTextLight: {
    color: 'white',
    fontSize: 24
  },
  rowFront: {
    zIndex: 10,
    position: 'absolute',
    backgroundColor: 'white'
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    position: 'absolute',
    zIndex: 0
  },
  stopButton: {
    height: 81,
    width: 81,
    backgroundColor: '#FA5D9F',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pauseButton: {
    height: 81,
    width: 81,
    backgroundColor: '#FFE079',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
