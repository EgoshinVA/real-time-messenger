import { createBrowserRouter } from "react-router-dom";
import App from "../../app/App";
import {StartPage} from "../components/StartPage/StartPage";
import {SearchUsers} from "../../feauteres/users/ui/SearchUsers/SearchUsers";
import {Page404} from "../components/Page404/Page404";
import {ChatRedirect} from "../../feauteres/chat/ui/ChatForm/ChatRedirect";

export const Path = {
    START: '/',
    USERS: '/users',
    PAGE404: '/page404',
    CHATS: '/chats/:id',
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: Path.START,
                element: <StartPage/>,
            },
            {
                path: Path.USERS,
                element: <SearchUsers/>,
            },
            {
                path: Path.PAGE404,
                element: <Page404/>,
            },
            {
                path: Path.CHATS,
                element: <ChatRedirect/>,
            },
        ],
    },
])