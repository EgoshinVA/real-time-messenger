import {AddMessageForm} from "./AddMessageForm";
import {useState} from "react";

export default {
    title: "AddMessageForm",
}

export const MessageFormReturningValueByClick = () => {
    const [message, setMessage] = useState<string>('');
    return <>
        <AddMessageForm onCLick={setMessage}/>
        {message}
    </>
}