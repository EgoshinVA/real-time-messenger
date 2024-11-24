import React, {ChangeEvent, useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

type AddMessageFormPropsType = {
    onCLick: (title: string) => void;
}

export const AddMessageForm: React.FC<AddMessageFormPropsType> = (props) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string>('');

    const onHandleClick = () => { // send title
        if (!title.trim()) {
            setError('Empty title')
        } else {
            props.onCLick(title.trim())
            setTitle('')
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { // change title value by typing
        setTitle(e.target.value)
        error && setError('')
    }

    const onEnterClick = (e: React.KeyboardEvent<HTMLDivElement>) => { // send title on Enter click
        e.key === 'Enter' && onHandleClick()
    }

    return (
        <div>
            <Paper
                elevation={6}
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%'}}>
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    error={!!error} value={title} onChange={onChange} placeholder={error ? error : 'Type smth...'}
                    onKeyPress={onEnterClick}
                />
                <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                <IconButton color="primary" sx={{p: '10px'}} aria-label="directions" onClick={onHandleClick}>
                    <SendIcon/>
                </IconButton>
            </Paper>
        </div>
    );
};