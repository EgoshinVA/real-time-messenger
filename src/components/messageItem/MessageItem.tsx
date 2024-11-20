import React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import {styled} from "@mui/material/styles";

type MessageItemPropsType = {
    time: number
    title: string
    type: 'myMessage' | 'anotherMessage'
    avatarUrl: string
}

const StyledChip = styled(Chip)({
    '& .MuiChip-avatar': {
        marginLeft: '-6px',
        marginRight: '5px',
    },
});

export const MessageItem: React.FC<MessageItemPropsType> = (props) => {
    return (
        <div style={{display: 'flex', alignItems: props.type === 'myMessage' ? 'flex-end' : 'flex-start', flexDirection: 'column', marginBottom: 2}}>
            {props.type === 'myMessage' ? <StyledChip
                sx={{flexDirection: 'row-reverse'}}
                avatar={<Avatar sx={{marginLeft: '-6px', marginRight: '5px'}} alt="Avatar" src={props.avatarUrl}/>}
                label={props.title}
                variant="filled"
            /> : <Chip
                avatar={<Avatar alt="Avatar" src={props.avatarUrl}/>}
                label={props.title}
                variant="filled"
            />}
        </div>
    );
};