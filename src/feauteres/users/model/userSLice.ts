import {createSlice} from "@reduxjs/toolkit";
import {v1} from "uuid";

export type UserType = {
    id: string
    name: string
    email: string
    phone: string
    avatarUrl: string
}

const initialState = {
    users: [ // initial state of users
        {
            id: 'userId1',
            name: 'Vitaliy',
            email: 'mail@mail.com',
            phone: '88992881',
            avatarUrl: 'https://forum.service-cm.ru/media/kunena/avatars/users/avatar906.jpg'
        },
        {
            id: 'userId2',
            name: 'Anton',
            email: 'mail221@mail.com',
            phone: '83456641',
            avatarUrl: 'https://ae01.alicdn.com/kf/HTB1303KcfBNTKJjSszeq6Au2VXaz/1730-Cute-Black-Cat-Baby-Wear-Glasses-Wall-Sticker-Art-Poster-For-Home-Decor-Silk-Canvas.jpg'
        },
        {
            id: v1(),
            name: 'Dima',
            email: 'manama@mail.com',
            phone: '89063453',
            avatarUrl: 'https://steamuserimages-a.akamaihd.net/ugc/2100422066956953334/BCFFD0DB0C56F71CD288304540E39FC2FADFD155/?imw=512&imh=341&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true'
        },
    ] as UserType[]
}

const userSLice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    selectors: {
        selectUsers: state => state.users,
    }
})

export const {selectUsers} = userSLice.selectors

export default userSLice.reducer;