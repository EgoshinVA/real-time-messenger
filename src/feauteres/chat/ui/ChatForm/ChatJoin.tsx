import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Button from '@mui/material/Button';
import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {selectMyId} from "../../../../app/App.slice";
import {ChatType, joinChat} from "../../model/chatSlice";
import {selectUsers} from "../../../users/model/userSLice";

type Props = {
    chat: ChatType
}

export const ChatJoin = ({chat}: Props) => {
    const dispatch = useAppDispatch();

    const users = useAppSelector(selectUsers).filter(u => chat.usersIDs.includes(u.id))
    const myId = useAppSelector(selectMyId)

    const handleJoinChat = () => {
        dispatch(joinChat({chatId: chat.id, userId: myId}))
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <h2>Chat users:</h2>
            <List dense sx={{width: '100%', maxWidth: 260, textAlign: 'center'}}>
                {users.map(user => <ListItem
                        key={user.id}
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar
                                    alt='avatar'
                                    src={user.avatarUrl}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={user.name}/>
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
            <Button onClick={handleJoinChat} variant="contained">Join chat</Button>
        </div>
    );
};