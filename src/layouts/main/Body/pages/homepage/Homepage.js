import React, { useContext, useRef } from "react";
import Tippy from "@tippyjs/react/headless"

import styles from "./homepage.module.scss"
import GlobalContext from "../../../../hooks/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faGripVertical, faHandPointLeft, faHandshake, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Homepage() {

    const { userInformations } = useContext(GlobalContext)
    const menuCurrent = useRef([{
        title: "Kết nối đối tác",
        link: "/connect",
        classes: styles.ok,
        icon: <FontAwesomeIcon icon={faHandshake}/>,
    }, {
        title: "Bạn bè",
        link: `/friends/${userInformations._id}`,
        classes: styles.ok,
        icon: <FontAwesomeIcon icon={faUserGroup}/>,
    },{
        title: "Kế hoạch sắp tới",
        link: "/plans",
        classes: styles.ok,
        icon: <FontAwesomeIcon icon={faCalendarPlus}/>,
    }])
    const navigate = useNavigate()
    function MenuTag({ title, link, classes, icon }){

        const onGotoLink = () => {
            navigate(link)
            console.log(link)
        }

        return (
            <div onClick={onGotoLink} className={[styles.menuTag, classes].join(" ") }>
                <p>{icon}&nbsp;{title}</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <Tippy
                placement="bottom-start"
                interactive={true}
                visible={true}
                offset={[0, 0.5]}
                render={attr => (
                    <div className={styles.menuWrapper} {...attr} tabIndex="-1">
                        {menuCurrent.current.map((tag, index) => <MenuTag
                            title={tag.title}
                            key={index}
                            classes={tag.classes}
                            icon={tag.icon}
                            link={tag.link}
                        />)}
                    </div>
                )}
            >
                <div className={styles.menu}>
                    <p><FontAwesomeIcon icon={faGripVertical} />&nbsp;&nbsp;Danh mục</p>
                </div>
            </Tippy>
            <div className={styles.main}>

            </div>
        </div>
    );
}

export default Homepage;