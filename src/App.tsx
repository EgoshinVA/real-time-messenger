import React, {useState} from 'react';
import './App.css';
import ButtonAppBar from "./components/buttonAppBar/ButtonAppBar";
import TemporaryDrawer from "./components/temporaryDrawer/TemporaryDrawer";
import {v1} from "uuid";
import {ChatForm} from "./components/chatForm/ChatForm";
import {Route, Routes} from "react-router-dom";
import {StartPage} from "./components/startPage/StartPage";

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

export type UserType = {
    id: string
    name: string
    email: string
    phone: string
    avatarUrl: string
}

const userId1 = v1()
const userId2 = v1()

const myId = userId1

const initialState: ChatType[] = [
    {
        id: v1(),
        title: 'Global chat',
        ownerId: myId,
        usersIDs: [userId1, userId2],
        messages: {
            [userId1]: [
                {id: '1', title: 'My first message', time: '22:14:45'},
                {id: '2', title: 'My second message', time: '22:15:01'},
            ],
            [userId2]: [
                {id: '3', title: 'You first message', time: '22:15:00'},
                {id: '4', title: 'You second message', time: '22:15:22'},
            ],
        }
    },
    {
        id: v1(),
        title: 'My own chat',
        ownerId: myId,
        usersIDs: [userId1, userId2],
        messages: {
            [userId1]: [
                {id: '1', title: 'Hi!', time: '01:10:22'},
                {id: '2', title: 'Can I call you now?', time: '01:12:50'},
            ],
            [userId2]: [
                {id: '3', title: 'Hey bro!', time: '01:12:00'},
                {id: '4', title: 'Yeah', time: '01:13:12'},
            ],
        }
    }
]

function App() {
    const [open, setOpen] = useState(false);
    const [chats, setChats] = useState<ChatType[]>(initialState)

    const addChat = (title: string, ownerId: string) => {
        const newChat = {id: v1(), title, ownerId, usersIDs: [ownerId], messages: {[ownerId]: []}}
        setChats([...chats, newChat])
    }

    const date = new Date();
    const showTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    const addMessage = (chatId: string, userId: string, message: string) => {
        const newMessage = {id: v1(), title: message, time: showTime}
        setChats(chats.map(chat => chat.id === chatId ? {
            ...chat,
            messages: {...chat.messages, [userId]: [...chat.messages[userId], newMessage]}
        } : chat))
    }

    return (
        <div>
            <ButtonAppBar open={open} setOpen={setOpen}/>
            <TemporaryDrawer open={open} chats={chats} myId={myId} setOpen={setOpen} addChat={addChat}/>
            <Routes>
                <Route path="/" element={<StartPage/>}/>
                {chats.map(chat => <Route path={chat.id}
                                          element={<ChatForm chat={chat} myId={myId} addMessage={addMessage}/>}/>)}
            </Routes>
        </div>
    );
}

export default App;
