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
    return (
        <div>
            <Container fixed>
                {props.chat.usersIDs.map(userID => userID === props.myId ? props.chat.messages[userID].map(chat =>
                    <MessageItem type='myMessage' time={chat.time} title={chat.title}
                                 avatarUrl={''}/>) : props.chat.messages[userID].map(chat => <MessageItem
                    type='anotherMessage' time={chat.time} title={chat.title} avatarUrl={''}/>))}
                <AddMessageForm onCLick={(title: string) => props.addMessage(props.chatId, props.myId, title)}/>
            </Container>
        </div>
    );
};