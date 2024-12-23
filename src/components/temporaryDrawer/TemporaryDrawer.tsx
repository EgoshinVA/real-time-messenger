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
import {ChatType} from "../../App";
import {AddMessageForm} from "../addMessageForm/AddMessageForm";
import {Link} from "react-router-dom";

type TemporaryDrawerPropsType = {
    open: boolean
    chats: ChatType[]
    myId: string
    setOpen: (open: boolean) => void
    addChat: (title: string, ownerId: string) => void
}

export default function TemporaryDrawer(props: TemporaryDrawerPropsType) {
    const toggleDrawer = (newOpen: boolean) => () => {
        props.setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {props.chats.map(chat => (
                    <ListItem key={chat.id} disablePadding>
                        <Link to={chat.id} style={{textDecoration: 'none', color: 'inherit'}}>
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
            <Drawer open={props.open} onClose={toggleDrawer(false)}>
                {DrawerList}
                <AddMessageForm onCLick={(title: string) => props.addChat(title, props.myId)}/>
            </Drawer>
        </div>
    );
}
