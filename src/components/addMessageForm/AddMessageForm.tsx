import React, {ChangeEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddMessageFormPropsType = {
    onCLick: (title: string) => void;
}

export const AddMessageForm: React.FC<AddMessageFormPropsType> = (props) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string>('');

    const onHandleClick = () => {
        if (!title.trim()) {
            setError('Empty title')
        } else{
            props.onCLick(title.trim())
            setTitle('')
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.target.value)
        error && setError('')
    }

    return (
        <div>
            <TextField size='small' error={!!error} value={title} onChange={onChange} label={error ? error : 'Type smth...'}
                       variant="outlined"/>
            <Button variant="contained" onClick={onHandleClick}>send</Button>
        </div>
    );
};