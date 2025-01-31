import React from 'react';
import ListItem from "@mui/material/ListItem";
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";


import {UserType} from "../../../users/model/userSLice";

type UsersListPropsType = {
    users: UserType[]
    isOwner: boolean
    myId: string
    deleteUserFromChat: (userId: string) => void
}

export const UsersList: React.FC<UsersListPropsType> = (props) => {
    return (
        <List dense sx={{width: '100%', maxWidth: 260, position: 'absolute', right: 0, textAlign: 'center'}}>
            <span>Users:</span>
            {props.users.map(user => <ListItem
                    key={user.id}
                    secondaryAction={
                        props.isOwner ? props.isOwner && !(user.id === props.myId) &&
                            <IconButton edge="end" aria-label="delete" onClick={() => props.deleteUserFromChat(user.id)}>
                                <DeleteIcon/>
                            </IconButton> : user.id === props.myId &&
                            <IconButton edge="end" aria-label="delete" onClick={() => props.deleteUserFromChat(user.id)}>
                                <DeleteIcon/>
                            </IconButton>
                    }
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
    );
};