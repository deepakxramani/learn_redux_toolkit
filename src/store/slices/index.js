import { configureStore } from "@reduxjs/toolkit"
import todoSlice from "./TodoSlice"

const store=configureStore({
    reducer:{
        todolist: todoSlice,
    }
})

export default store;