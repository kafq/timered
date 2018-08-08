import { Notifications } from 'expo';

export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const ADD_NEW_TIMER = 'ADD_NEW_TIMER';
export const PAUSE_TIMER = 'PAUSE_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const UPDATE_NEW_TIMER_COLOR = 'UPDATE_NEW_TIMER_COLOR';
export const UPDATE_NEW_TIMER_TITLE = 'UPDATE_NEW_TIMER_TITLE';
export const UPDATE_NEW_TIMER_DURATION = 'UPDATE_NEW_TIMER_DURATION';

//Import the sample data
dataSample = {
    test: ['red', 'white']
}
 
export function getData(){
    return (dispatch) => {
 
        //Make API Call
        //For this example, I will be using the sample data in the json file
        //delay the retrieval [Sample reasons only]
        setTimeout(() => {
            const data  = dataSample;
            dispatch({type: DATA_AVAILABLE, payload:data});
        }, 2000);
 
    };
}

export function setNotification(timerDuration) {
    const schedulingOptions = { time: Date.now() + timerDuration };
    Notifications.scheduleLocalNotificationAsync(
      localnotification,
      schedulingOptions
    );
}

export const addNewTimer = (title, color, duration) => ({type: ADD_NEW_TIMER, payload: {title, color, duration, id: Date.now(), dateCreated: Date.now()}})
export const pauseTimer = (id) => ({type: PAUSE_TIMER, payload: id})
export const stopTimer = (id) => ({type: STOP_TIMER, payload: id})
export const updateNewTimerTitle = (newTitle) => ({type: UPDATE_NEW_TIMER_TITLE, payload: newTitle})
export const updateNewTimerColor = (newColor) => ({type: UPDATE_NEW_TIMER_COLOR, payload: newColor})
export const updateNewTimerDuration = (newDuration) => ({type: UPDATE_NEW_TIMER_DURATION, payload: newDuration})