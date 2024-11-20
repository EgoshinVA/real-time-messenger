import {MessageItem} from "./MessageItem";

export default {
    title: 'MessageItem'
}

export const MessageItemFromUser = () => <MessageItem title={'My first mail!!!'} type={'myMessage'} avatarUrl={''} time={20}/>

export const MessageItemFromAnotherUser = () => <MessageItem title={'You first mail!!!'} type={'anotherMessage'} avatarUrl={''} time={20}/>