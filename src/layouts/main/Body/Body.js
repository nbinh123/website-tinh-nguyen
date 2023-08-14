import React from "react"
import styles from "./body.module.scss"
import { Link, Route, Router, Routes } from "react-router-dom"

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Homepage from "./pages/homepage/Homepage";
import UserInfo from "./pages/info/UserInfo";
import Setting from "./pages/settings/Settings";
import Nofication from "./pages/nofications/Nofication";
import OrganizationDetail from "./pages/details/OrganizationDetails";
import Shop from "./pages/shop/Shop";
import Contact from "./pages/contact/Contact";
import History from "./pages/history/History";
import Bill from "./pages/shop/Bill/Bill";
import Stranger from "./pages/connect/stranger/Stranger";

function Body() {
    return (  
        <div class={styles.container}>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/info" element={<UserInfo/>}/>
                <Route path="/settings" element={<Setting/>}/>
                <Route path="/nofications" element={<Nofication/>}/>
                <Route path="/organization/detail" element={<OrganizationDetail/>}/>
                <Route path="shop">
                    <Route path="" element={<Shop/>}/>
                    <Route path="bill" element={<Bill/>}/>
                </Route>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/history" element={<History/>}/>
                {/* <Route path="/connect">
                    <Route path="find">
                        <Route path=":id/info" element={<Stranger/>} />
                    </Route>
                </Route> */}
            </Routes>
        </div>
    );
}

export default Body; 