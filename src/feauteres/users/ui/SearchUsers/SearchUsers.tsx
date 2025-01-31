import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import {useAppSelector} from "../../../../common/hooks/hooks";
import {selectSearchUserName} from "../../../../app/App.slice";
import {selectUsers} from "../../model/userSLice";

export const SearchUsers = () => {
    const users = useAppSelector(selectUsers)
    const searchUserName = useAppSelector(selectSearchUserName)

    let filteredUsers = users;
    filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(searchUserName.toLowerCase()))

    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <List dense sx={{width: '100%', maxWidth: 260, textAlign: 'center'}}>
                <h2>Users:</h2>
                {filteredUsers.map(user => <ListItem
                        key={user.id}
                        disablePadding>
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