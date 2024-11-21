import {MessageItem} from "./MessageItem";

export default {
    title: 'MessageItem'
}

const date = new Date();
const showTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

export const MessageItemFromUser = () => <MessageItem title={'My first mail!!!'} type={'myMessage'} avatarUrl={''}
                                                      time={showTime}/>

export const MessageItemFromAnotherUser = () => <MessageItem title={'You first mail!!!'} type={'anotherMessage'}
                                                             avatarUrl={''} time={showTime}/>