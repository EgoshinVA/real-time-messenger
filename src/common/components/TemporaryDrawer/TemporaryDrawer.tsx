import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import {AddMessageForm} from "../AddMessageForm/AddMessageForm";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {selectIsOpen, selectMyId, toggleOpen} from "../../../app/App.slice";
import {addChat, selectChats} from "../../../feauteres/chat/model/chatSlice";

export const TemporaryDrawer = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectIsOpen);
    const myId = useAppSelector(selectMyId)
    const chats = useAppSelector(selectChats);

    const toggleDrawer = () => {
        dispatch(toggleOpen())
    }

    const handleAddChat = (title: string, ownerId: string) => {
        dispatch(addChat({title, ownerId}))
    }

    const DrawerList = (
        <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer}>
            <List>
                {chats.map(chat => (
                    <ListItem key={chat.id} disablePadding>
                        <Link to={`/chats/${chat.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MailIcon/>
                                </ListItemIcon>
                                <ListItemText primary={chat.title}/>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Divider/>
        </Box>
    );

    return (
        <div>
            <Drawer open={isOpen} onClose={toggleDrawer}>
                {DrawerList}
                <AddMessageForm onCLick={(title: string) => handleAddChat(title, myId)}/>
            </Drawer>
        </div>
    );
}
