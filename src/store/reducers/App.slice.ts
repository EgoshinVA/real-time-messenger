import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {v1} from "uuid";
import {ChatType, UserType} from "../../App";

type AppState = { //initial state type
    userId1: string,
    userId2: string,
    myId: string,
    open: boolean,
    searchUserName: string,
    chats: ChatType[]
    users: UserType[]
}

const createInitialState = (): AppState => { //initial state for example
    const userId1 = v1()
    const userId2 = v1()

    return {
        userId1,
        userId2,
        myId: userId1, // there is no login, so I used hardcode value of my id
        open: false, // toggle value of drawer
        searchUserName: '',
        chats: [ // chats for example
            {
                id: 'first_chat_id',
                title: 'Global chat',
                ownerId: userId1,
                usersIDs: [userId1, userId2],
                messages: {
                    [userId1]: [
                        {id: '1', title: 'My first message', time: '02:14:45'},
                        {id: '2', title: 'My second message', time: '02:15:01'},
                    ],
                    [userId2]: [
                        {id: '3', title: 'You first message', time: '02:15:00'},
                        {id: '4', title: 'You second message', time: '02:15:22'},
                    ],
                }
            },
            {
                id: 'second_chat_id',
                title: 'My own chat',
                ownerId: userId2,
                usersIDs: [userId2],
                messages: {
                    [userId2]: [
                        {id: '3', title: 'Hey bro!', time: '01:12:00'},
                        {id: '4', title: 'Yeah', time: '01:13:12'},
                    ],
                }
            }
        ],
        users: [ // initial state of users
            {
                id: userId1,
                name: 'Vitaliy',
                email: 'mail@mail.com',
                phone: '88992881',
                avatarUrl: 'https://forum.service-cm.ru/media/kunena/avatars/users/avatar906.jpg'
            },
            {
                id: userId2,
                name: 'Anton',
                email: 'mail221@mail.com',
                phone: '83456641',
                avatarUrl: 'https://ae01.alicdn.com/kf/HTB1303KcfBNTKJjSszeq6Au2VXaz/1730-Cute-Black-Cat-Baby-Wear-Glasses-Wall-Sticker-Art-Poster-For-Home-Decor-Silk-Canvas.jpg'
            },
            {
                id: v1(),
                name: 'Dima',
                email: 'manama@mail.com',
                phone: '89063453',
                avatarUrl: 'https://steamuserimages-a.akamaihd.net/ugc/2100422066956953334/BCFFD0DB0C56F71CD288304540E39FC2FADFD155/?imw=512&imh=341&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true'
            },
        ]
    }
}

export const appSlice = createSlice({
    name: 'app',
    initialState: createInitialState(),
    reducers: {
        addChat: (state, action: PayloadAction<{ title: string, ownerId: string }>) => { // create new object in array of chats
            const title = action.payload.title
            const ownerId = action.payload.ownerId
            const newChat = {id: v1(), title, ownerId, usersIDs: [ownerId], messages: {[ownerId]: []}}
            state.chats = [...state.chats, newChat] // put new chat near all chats
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
        toggleOpen: (state) => {
            state.open = !state.open // open close drawer
        },
        changeSearchUserName: (state, action: PayloadAction<string>) => {
            state.searchUserName = action.payload
        }
    },
})

export default appSlice.reducer