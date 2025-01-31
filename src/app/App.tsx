import React from 'react';
import './App.css';
import {ButtonAppBar} from "../common/components/ButtonAppBar/ButtonAppBar";
import {Outlet} from "react-router-dom";
import {TemporaryDrawer} from "../common/components/TemporaryDrawer/TemporaryDrawer";

function App() {
    return (
        <div>
            <ButtonAppBar/>
            <TemporaryDrawer/>
            <Outlet/>
        </div>
    );
}

export default App;
