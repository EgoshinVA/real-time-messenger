import React from 'react';
import Container from '@mui/material/Container';
import {MessageItem} from "./MessageItem/MessageItem";
import {AddMessageForm} from "../../../../common/components/AddMessageForm/AddMessageForm";
import {UsersList} from "./UsersList";
import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {selectMyId} from "../../../../app/App.slice";
import {addMessage, ChatType, deleteUserFromChat} from "../../model/chatSlice";
import {selectUsers} from "../../../users/model/userSLice";

type ChatFormPropsType = {
    chat: ChatType
}

export const ChatForm: React.FC<ChatFormPropsType> = ({chat}) => {
    const dispatch = useAppDispatch();
    const myId = useAppSelector(selectMyId)
    const users = useAppSelector(selectUsers).filter(u => chat.usersIDs.includes(u.id))

    const newChatArray = chat.usersIDs.map(user => user === myId ? chat.messages[user].map(chat => ({
        id: chat.id, title: chat.title, time: chat.time, type: 'myMessage',
    })) : chat.messages[user].map(chat => ({
        id: chat.id, title: chat.title, time: chat.time, type: 'anotherMessage',
    })))

    const handleAddMessage = (chatId: string, userId: string, message: string) => {
        dispatch(addMessage({chatId, userId, message}))
    }


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
        <MessageItem key={chat.id} type='myMessage' time={chat.time} title={chat.title}
                     avatarUrl={''}/> : <MessageItem key={chat.id}
                                                     type='anotherMessage' time={chat.time} title={chat.title}
                                                     avatarUrl={''}/>) // sorting array of messages by time

    const handleDeleteUserFromChat = (userId: string) => {
        dispatch(deleteUserFromChat({chatId: chat.id, userId}))
    }

    return (
        <div style={{display: 'flex'}}>
            <Container fixed>
                {chats}
                <AddMessageForm onCLick={(title: string) => handleAddMessage(chat.id, myId, title)}/>
            </Container>

            <UsersList users={users} isOwner={chat.ownerId === myId} myId={myId}
                       deleteUserFromChat={handleDeleteUserFromChat}/>
        </div>
    )
}