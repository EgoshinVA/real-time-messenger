import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import {UserType} from "../../App";

type SearchUsersPropsType = {
    users: UserType[]
    name: string
}

export const SearchUsers: React.FC<SearchUsersPropsType> = (props) => {
    let filteredUsers = props.users;
    filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(props.name.toLowerCase()))

    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <List dense sx={{width: '100%', maxWidth: 260, textAlign: 'center'}}>
                <h2>Users:</h2>
                {filteredUsers.map(user => <ListItem
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
        </div>
    );
};