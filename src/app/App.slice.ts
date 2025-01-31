import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
    userId1: 'userId1',
    userId2: 'userId2',
    myId: 'userId1',
    isOpen: false,
    searchUserName: '',
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleOpen: (state) => {
            state.isOpen = !state.isOpen // open close drawer
        },
        changeSearchUserName: (state, action: PayloadAction<string>) => {
            state.searchUserName = action.payload
        }
    },
    selectors: {
        selectSearchUserName: state => state.searchUserName,
        selectMyId: state => state.myId,
        selectIsOpen: state => state.isOpen,
    }
})

export const {changeSearchUserName, toggleOpen} = appSlice.actions;
export const {selectSearchUserName, selectMyId, selectIsOpen} = appSlice.selectors

export default appSlice.reducer