import React, { useContext } from "react";
import Tippy from "@tippyjs/react/headless"

import styles from "./homepage.module.scss"
import GlobalContext from "../../../../hooks/GlobalContext";

function Homepage() {

    const { userInformations } = useContext(GlobalContext)

    return (  
        <div className={styles.container}>
            homepage
        </div>
    );
}

export default Homepage;