import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";

export type MessageType = {
    id: string
    title: string
    time: string
}
export type MessagesType = {
    [userId: string]: MessageType[]
}
export type ChatType = {
    id: string
    title: string
    ownerId: string
    usersIDs: string[]
    messages: MessagesType
}

const initialState = {
    chats: [
        {
            id: 'first_chat_id',
            title: 'Global chat',
            ownerId: 'userId1',
            usersIDs: ['userId1', 'userId2'],
            messages: {
                ['userId1']: [
                    {id: '1', title: 'My first message', time: '02:14:45'},
                    {id: '2', title: 'My second message', time: '02:15:01'},
                ],
                ['userId2']: [
                    {id: '3', title: 'You first message', time: '02:15:00'},
                    {id: '4', title: 'You second message', time: '02:15:22'},
                ],
            }
        },
        {
            id: 'second_chat_id',
            title: 'My own chat',
            ownerId: 'userId2',
            usersIDs: ['userId2'],
            messages: {
                ['userId2']: [
                    {id: '3', title: 'Hey bro!', time: '01:12:00'},
                    {id: '4', title: 'Yeah', time: '01:13:12'},
                ],
            }
        }
    ] as ChatType[],
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addChat: (state, action: PayloadAction<{ title: string, ownerId: string }>) => { // create new object in array of chats
            const title = action.payload.title
            const ownerId = action.payload.ownerId
            const newChat = {id: v1(), title, ownerId, usersIDs: [ownerId], messages: {[ownerId]: []}}
            state.chats.unshift(newChat)
        },
        addMessage: (state, action: PayloadAction<{ chatId: string, userId: string, message: string }>) => {
            // add new message in array messages of current user and add user id to array of ids
            const chatId = action.payload.chatId
            const userId = action.payload.userId
            const message = action.payload.message
            const date = new Date();
            const showTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            const newMessage = {id: v1(), title: message, time: showTime}
            state.chats = state.chats.map(chat => chat.id === chatId ? {
                ...chat,
                messages: {...chat.messages, [userId]: [...chat.messages[userId], newMessage]}
            } : chat)
        },
        deleteUserFromChat: (state, action: PayloadAction<{ chatId: string, userId: string }>) => {
            const chatId = action.payload.chatId
            const userId = action.payload.userId
            state.chats = state.chats.map(chat => chat.id === chatId ? {
                ...chat,
                usersIDs: userId !== chat.ownerId ? chat.usersIDs.filter(u => u !== userId) : chat.usersIDs
            } : chat) // delete user from array users of chat
        },
        joinChat: (state, action: PayloadAction<{ chatId: string, userId: string }>) => {
            const chatId = action.payload.chatId
            const userId = action.payload.userId
            state.chats = state.chats.map(chat => chat.id === chatId ? {
                ...chat,
                usersIDs: [...chat.usersIDs, userId],
                messages: {...chat.messages, [userId]: []}
            } : chat) // add array of messages for user and add user to users of chat
        },
    },
    selectors: {
        selectChats: state => state.chats,
    }
})

export const {addChat, joinChat, addMessage, deleteUserFromChat} = chatSlice.actions;
export const {selectChats} = chatSlice.selectors

export default chatSlice.reducer