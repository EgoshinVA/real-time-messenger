import React from 'react';
import Container from '@mui/material/Container';
import {ChatType, UserType} from "../../App";
import {MessageItem} from "../messageItem/MessageItem";
import {AddMessageForm} from "../addMessageForm/AddMessageForm";
import {UsersList} from "./UsersList";
import {ChatJoin} from "./ChatJoin";

type ChatFormPropsType = {
    chat: ChatType
    myId: string
    users: UserType[]
    addMessage: (chatId: string, userId: string, message: string) => void
    deleteUserFromChat: (chatId: string, userId: string) => void
}

export const ChatForm: React.FC<ChatFormPropsType> = (props) => {
    const newChatArray = props.chat.usersIDs.map(user => user === props.myId ? props.chat.messages[user].map(chat => ({
        id: chat.id, title: chat.title, time: chat.time, type: 'myMessage',
    })) : props.chat.messages[user].map(chat => ({
        id: chat.id, title: chat.title, time: chat.time, type: 'anotherMessage',
    })))

    function compare(a: any, b: any) {
        if (a.time < b.time) {
            return -1;
        }
        if (a.time > b.time) {
            return 1;
        }
        return 0;
    }

    const chats = newChatArray.flat().sort(compare).map(chat => chat.type === 'myMessage' ?
        <MessageItem type='myMessage' time={chat.time} title={chat.title}
                     avatarUrl={''}/> : <MessageItem
            type='anotherMessage' time={chat.time} title={chat.title} avatarUrl={''}/>)

    const deleteUserFromChat = (userId: string) => {
        props.deleteUserFromChat(props.chat.id, userId)
    }

    return (
        <div style={{display: 'flex'}}>

            <Container fixed>
                {chats}
                <AddMessageForm onCLick={(title: string) => props.addMessage(props.chat.id, props.myId, title)}/>
            </Container>

            <UsersList users={props.users} isOwner={props.chat.ownerId === props.myId} myId={props.myId}
                       deleteUserFromChat={deleteUserFromChat}/>


        </div>
    )
}