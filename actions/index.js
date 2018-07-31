export const DATA_AVAILABLE = 'DATA_AVAILABLE';

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
