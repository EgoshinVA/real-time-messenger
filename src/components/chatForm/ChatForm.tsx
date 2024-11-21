import React from 'react';
import Container from '@mui/material/Container';
import {ChatType} from "../../App";
import {MessageItem} from "../messageItem/MessageItem";
import {AddMessageForm} from "../addMessageForm/AddMessageForm";

type ChatFormPropsType = {
    chat: ChatType
    myId: string
    chatId: string
    addMessage: (chatId: string, userId: string, message: string) => void
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

    return (
        <div>
            <Container fixed>
                {chats}
                <AddMessageForm onCLick={(title: string) => props.addMessage(props.chatId, props.myId, title)}/>
            </Container>
        </div>
    )
}