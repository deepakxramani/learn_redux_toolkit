import {createSlice, current} from "@reduxjs/toolkit"
const userSlice=createSlice({
    name: 'todolist',
    initialState:{},
    reducers:{
        addTask(state,action){
            state[action.payload[0]]=action.payload[1]
            console.log(current(state))
        },
        editTask(state,action){
            state[action.payload[0]]=action.payload[1]
            console.log(current(state))
        },
        removeTask(state,action){
            delete state[action.payload[0]]
            console.log(current(state))
        },
        clearAllTasks(state,action){
            return {};
        },
    }
})

console.log(userSlice.actions)
export default userSlice.reducer
export const {addTask,editTask,removeTask,clearAllTasks}=userSlice.actions