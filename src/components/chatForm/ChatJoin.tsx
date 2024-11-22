import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import {UserType} from "../../App";
import Button from '@mui/material/Button';

type ChatJoinPropsType = {
    users: UserType[]
    joinChat: () => void
}

export const ChatJoin: React.FC<ChatJoinPropsType> = (props) => {
    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <h2>Chat users:</h2>
            <List dense sx={{width: '100%', maxWidth: 260, textAlign: 'center'}}>
                {props.users.map(user => <ListItem
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
            <Button onClick={props.joinChat} variant="contained">Join chat</Button>
        </div>
    );
};