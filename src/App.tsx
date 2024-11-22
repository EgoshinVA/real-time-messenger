import React, {useState} from 'react';
import './App.css';
import ButtonAppBar from "./components/buttonAppBar/ButtonAppBar";
import TemporaryDrawer from "./components/temporaryDrawer/TemporaryDrawer";
import {v1} from "uuid";
import {ChatForm} from "./components/chatForm/ChatForm";
import {Route, Routes} from "react-router-dom";
import {StartPage} from "./components/startPage/StartPage";
import {ChatJoin} from "./components/chatForm/ChatJoin";

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
        ownerId: userId2,
        usersIDs: [userId2],
        messages: {
            [userId2]: [
                {id: '3', title: 'Hey bro!', time: '01:12:00'},
                {id: '4', title: 'Yeah', time: '01:13:12'},
            ],
        }
    }
]

const usersInitial: UserType[] = [
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

function App() {
    const [open, setOpen] = useState(false);
    const [chats, setChats] = useState<ChatType[]>(initialState)
    const [users, setUsers] = useState<UserType[]>(usersInitial)

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

    const deleteUserFromChat = (chatId: string, userId: string) => {
        setChats(chats.map(chat => chat.id === chatId ? {
            ...chat,
            usersIDs: userId !== chat.ownerId ? chat.usersIDs.filter(u => u !== userId) : chat.usersIDs
        } : chat))
    }

    const joinChat = (chatId: string, userId: string) => {
        setChats(chats.map(chat => chat.id === chatId ? {
            ...chat,
            usersIDs: [...chat.usersIDs, userId],
            messages: {...chat.messages, [userId]: []}
        } : chat))
    }

    return (
        <div>
            <ButtonAppBar open={open} setOpen={setOpen}/>
            <TemporaryDrawer open={open} chats={chats} myId={myId} setOpen={setOpen} addChat={addChat}/>
            <Routes>
                <Route path="/" element={<StartPage/>}/>
                {chats.map(chat => <Route path={chat.id}
                                          element={chat.usersIDs.includes(myId) ? <ChatForm chat={chat} myId={myId}
                                                                                            users={users.filter(u => chat.usersIDs.includes(u.id))}
                                                                                            addMessage={addMessage}
                                                                                            deleteUserFromChat={deleteUserFromChat}/> :
                                              <ChatJoin users={users.filter(u => chat.usersIDs.includes(u.id))} joinChat={() => joinChat(chat.id, myId)}/>
                                          }/>)}
            </Routes>
        </div>
    );
}

export default App;
