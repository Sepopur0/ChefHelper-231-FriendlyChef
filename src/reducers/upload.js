import { SET_STEP,SET_RECIPE } from "./actions/actionDict"
const INITIAL_STATE={
    name:"",
    time:0, //mins,
    category:0,//enum, define in other file 
    generalImage:[],
    description:"",
    step:[]//each step is a object include id,image,description
}

const Recipe=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case SET_STEP:
            return {
                ...state,
                step:[...state.step,action.payload.step]
            }
        case SET_RECIPE:
            return Object.assign(state,action.payload)
        default:
            return state
    }
}
export default Recipe