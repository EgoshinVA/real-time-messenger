import React from 'react';
import './App.css';
import ButtonAppBar from "./components/buttonAppBar/ButtonAppBar";
import TemporaryDrawer from "./components/temporaryDrawer/TemporaryDrawer";
import {ChatForm} from "./components/chatForm/ChatForm";
import {Route, Routes} from "react-router-dom";
import {StartPage} from "./components/startPage/StartPage";
import {ChatJoin} from "./components/chatForm/ChatJoin";
import {useAppActions, useAppSelector} from "./store/hooks";

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

function App() {
    const chats = useAppSelector((state) => state.app.chats)
    const open = useAppSelector((state) => state.app.open)
    const users = useAppSelector((state) => state.app.users)
    const myId = useAppSelector((state) => state.app.myId)

    const {addChat, joinChat, addMessage, deleteUserFromChat, toggleOpen} = useAppActions()

    const handleAddChat = (title: string, ownerId: string) => {
        addChat({title, ownerId})
    }
    const handleJoinChat = (chatId: string, userId: string) => {
        joinChat({chatId, userId})
    }
    const handleAddMessage = (chatId: string, userId: string, message: string) => {
        addMessage({chatId, userId, message})
    }
    const handleDeleteUserFromChat = (chatId: string, userId: string) => {
        deleteUserFromChat({chatId, userId})
    }
    const handleToggleOpen = () => {
        toggleOpen()
    }

    return (
        <div>
            <ButtonAppBar open={open} setOpen={handleToggleOpen}/>
            <TemporaryDrawer open={open} chats={chats} myId={myId} setOpen={handleToggleOpen} addChat={handleAddChat}/>
            <Routes>
                <Route path="/" element={<StartPage/>}/>
                {chats.map(chat => <Route path={chat.id}
                                          element={chat.usersIDs.includes(myId) ? <ChatForm chat={chat} myId={myId}
                                                                                            users={users.filter(u => chat.usersIDs.includes(u.id))}
                                                                                            addMessage={handleAddMessage}
                                                                                            deleteUserFromChat={handleDeleteUserFromChat}/> :
                                              <ChatJoin users={users.filter(u => chat.usersIDs.includes(u.id))} joinChat={() => handleJoinChat(chat.id, myId)}/>
                                          }/>)}
            </Routes>
        </div>
    );
}

export default App;
