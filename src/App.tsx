import React, {useState} from 'react';
import './App.css';
import ButtonAppBar from "./components/buttonAppBar/ButtonAppBar";
import TemporaryDrawer from "./components/temporaryDrawer/TemporaryDrawer";
import {v1} from "uuid";
import {ChatForm} from "./components/chatForm/ChatForm";

export type MessageType = {
    id: string
    title: string
    time: number
}

export type MessagesType = {
    [userId: string]: MessageType[]
}

export type ChatType = {
    id: string
    title: string
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

const date = new Date();
const showTime = date.getHours()

const initialState: ChatType[] = [
    {
        id: v1(),
        title: 'Global chat',
        usersIDs: [userId1, userId2],
        messages: {
            [userId1]: [
                {id: '1', title: 'My first message', time: showTime},
                {id: '2', title: 'My second message', time: showTime},
            ],
            [userId2]: [
                {id: '3', title: 'You first message', time: showTime},
                {id: '4', title: 'You second message', time: showTime},
            ],
        }
    }
]

function App() {
    const [open, setOpen] = useState(false);
    const [chats, setChats] = useState<ChatType[]>(initialState)

    const addChat = (title: string) => {
        const newChat = {id: v1(), title, usersIDs: [], messages: {}}
        setChats([...chats, newChat])
    }

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
            <TemporaryDrawer open={open} chats={chats} setOpen={setOpen} addChat={addChat}/>
            <ChatForm chat={chats[0]} myId={myId} chatId={chats[0].id} addMessage={addMessage}/>
        </div>
    );
}

export default App;
