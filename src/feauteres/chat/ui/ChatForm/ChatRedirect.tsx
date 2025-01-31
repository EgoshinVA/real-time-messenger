import React from 'react';
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../../common/hooks/hooks";
import {selectMyId} from "../../../../app/App.slice";
import {ChatForm} from "./ChatForm";
import {ChatJoin} from "./ChatJoin";
import {selectChats} from "../../model/chatSlice";

export const ChatRedirect = () => {
    const {id} = useParams()
    const chats = useAppSelector(selectChats)
    const chat = chats.find(u => u.id === id) || chats[0]
    const myId = useAppSelector(selectMyId)

    if (chat.usersIDs.includes(myId))
        return <ChatForm chat={chat}/>
    else return <ChatJoin chat={chat}/>
}