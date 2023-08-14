import React, { useContext, useEffect, useRef, useState, memo } from "react";
import styles from "./header.module.scss"

import Tippy from "@tippyjs/react/headless"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fa1, faBars, faBell, faCartShopping, faCircleInfo, faGears, faGift, faHandHoldingMedical, faHandshake, faHouse, faInfo, faPersonRunning, faPhoneFlip, faUser } from "@fortawesome/free-solid-svg-icons"
import NewLink from "../../components/NewLink";
import Button from "../../components/Button";
import GlobalContext from "../../hooks/GlobalContext";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {

    const { userInformations, setUserInformations } = useContext(GlobalContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        setUserInformations(null)
        localStorage.removeItem("accessToken")
        localStorage.removeItem("UID")
    }

    function Search() {
        return (
            <div className={styles.searching}>
                <input className={styles.searchInput} placeholder="Tìm kiếm"></input>
                <Button
                    title={"Tìm kiếm"}
                    onClicked={() => { }}
                    styles={{
                        color: "#c4c4fa",
                        cursor: "pointer",
                        padding: "13px",
                        background: "transparent",
                        border: "1px solid white",
                        "border-radius": "5px",
                    }}
                />
            </div>
        )
    }
    function Account() {
        // console.log(userInformations.nofications)
        function Nofications() {

            const TagNofication = memo(({ avatar, date, description, from, url, name }) => {

                const [day, setDay] = useState(new Date(date))
                useEffect(() => {

                }, [])
                const caculateDate = (timeA, timeB) => {
                    const distance = timeA - timeB
                    return Math.floor(distance / (1000 * 60 * 60 * 24));
                }

                return (
                    <div className={styles.tagNofication} onClick={() => navigate((url ? url : "/"))}>
                        <div className={styles.avatar}>
                            <img src={"https://chungkhoantaichinh.vn/wp-content/uploads/2022/12/hinh-meo-cute-chibi-10.jpg"}></img>
                        </div>
                        <div className={styles.contents}>
                            <div className={styles.description}>
                                <p style={{ margin: 0 }}>{description}</p>
                            </div>
                            <div className={styles.date}>
                                <p style={{ margin: 0, color: "blue" }}>{caculateDate(new Date(), day)}&nbsp;ngày trước</p>
                            </div>
                        </div>
                    </div>
                )
            })

            return (
                <Tippy
                    placement="bottom"
                    interactive={true}
                    render={attr => (
                        <div className={styles.noficationWrapper} tabIndex={"-1"} {...attr}>
                            {userInformations?.nofications.map((tag, index) => <TagNofication
                                avatar={tag.avatar}
                                date={tag.date}
                                description={tag.description}
                                from={tag.from}
                                url={tag.url}
                            />)}
                        </div>
                    )}
                >
                    <div className={styles.nofications}>
                        <Button
                            title={<FontAwesomeIcon style={{ fontSize: 13.5, color: "white" }} icon={faBell} />}
                            styles={{
                                cursor: "pointer",
                                height: "33px",
                                width: "33px",
                                borderRadius: "50%",
                                border: "1px solid white",
                                background: "transparent",
                            }}//#3700ff
                        // onClicked={() => navigate("/nofications")}
                        />
                    </div>
                </Tippy>
            )
        }
        function User() {
            function Main() {
                function TagMenu({ icon, title, link }) {
                    return (
                        <div className={styles.tagMenu}>
                            <NewLink
                                link={link}
                                child={<p style={{ borderRadius: "5px", margin: 0, padding: "5px", borderBottom: "1px solid black", padding: "13px 18px" }}>{icon ? icon : ""}&nbsp;&nbsp;{title}</p>}
                            />
                        </div>
                    )
                }
                return (
                    <div className={styles.menuTippy}>
                        <TagMenu
                            link={"/info"}
                            title={"Thông tin người dùng"}
                            icon={<FontAwesomeIcon style={{ fontSize: 17 }} icon={faCircleInfo} size={"23"} />}
                        />
                        <TagMenu
                            link={"/settings"}
                            title={"Cài đặt"}
                            icon={<FontAwesomeIcon style={{ fontSize: 17 }} icon={faGears} size={"23"} />}
                        />
                        <div className={styles.logOut} onClick={handleLogout}>
                            <p style={{ margin: 0, padding: "5px", color: "#551A8B", cursor: "pointer", padding: "13px 18px" }}>{<FontAwesomeIcon icon={faPersonRunning} style={{ fontSize: 20 }} />}&nbsp;&nbsp;Đăng xuất</p>
                        </div>
                    </div>
                )
            }
            function Authen() {
                return (
                    <div className={styles.authen}>
                        <NewLink
                            link={"/login"}
                            child={<p style={{
                                border: "1px solid blueviolet",
                                background: "transparent",
                                margin: 0,
                                padding: "8px 15px",
                                textAlign: "center",
                                borderRadius: "4px"
                            }}>Đăng nhập</p>}
                        />
                        <NewLink
                            link={"/register"}
                            child={<p style={{
                                border: "1px solid blueviolet",
                                background: "transparent",
                                margin: 0,
                                padding: "8px 15px",
                                textAlign: "center",
                                borderRadius: "4px"
                            }}>Đăng ký</p>}
                        />
                    </div>
                )
            }

            const [show, setShow] = useState(true)

            return (
                <Tippy
                    placement="bottom"
                    // visible={true}
                    offset={[0, 4.5]}
                    interactive={true}
                    render={attr => (
                        // bắt đầu render ở đây
                        <div tabIndex="-1" className={styles.tippy} {...attr} >
                            {userInformations !== null ? <Main /> : <Authen />}
                        </div>
                    )}
                >
                    <div className={styles.user}>
                        <Button
                            title={<FontAwesomeIcon style={{ color: "white", fontSize: 13.5 }} icon={faUser} />}
                            styles={{
                                cursor: "pointer",
                                width: "33px",
                                height: "33px",
                                display: "flex",
                                borderRadius: "50%",
                                "justify-content": "center",
                                "align-items": "center",
                                background: "transparent",
                                border: "1px solid white",
                            }}

                        />
                    </div>
                </Tippy>
            )
        }
        function Bars() {
            const menuTags = useRef([{
                icon: <FontAwesomeIcon icon={faInfo} />,
                title: "Thông tin chương trình",
                link: "/organization/detail"
            }, {
                icon: <FontAwesomeIcon icon={faGift} />,
                title: "Sản phẩm của chúng tôi",
                link: "/shop"
            }, {
                icon: <FontAwesomeIcon icon={faPhoneFlip} />,
                title: "Liên lạc và hỗ trợ",
                link: "/contact"
            }, {
                icon: <FontAwesomeIcon icon={faHandHoldingMedical} />,
                title: "Những dự án",
                link: "/history"
            }])
            function MenuTag({ icon, title, link }) {

                const onNavigate = () => {
                    navigate(link)
                }

                return (
                    <div className={styles.menuTag} onClick={onNavigate}>
                        <div className={styles.icon}>{icon}</div>
                        <p className={styles.title}>{title}</p>
                    </div>
                )
            }
            return (

                <Tippy
                    placement="bottom"
                    interactive={true}
                    // visible={true}
                    render={attr => (
                        <div className={styles.menuRendering} {...attr} tabIndex="-1">
                            {menuTags.current.map((tag, index) => <MenuTag
                                key={index}
                                icon={tag.icon}
                                link={tag.link}
                                title={tag.title}
                            />)}
                        </div>
                    )}
                >
                    <div className={styles.menu} style={{
                        visibility: (userInformations !== null ? "visible" : "hidden")
                    }}>
                        <Button
                            title={<FontAwesomeIcon style={{ fontSize: 25, color: "white" }} icon={faBars} />}
                            styles={{
                                cursor: "pointer",
                                height: "33px",
                                width: "33px",
                                borderRadius: "50%",
                                border: 0,
                                background: "transparent",
                                padding: "5px"
                            }}
                        />
                    </div>
                </Tippy>
            )
        }
        function Cart() {

            const goToBill = () => {
                navigate("/shop/bill")
            }

            return (
                <div className={styles.cart} onClick={goToBill}>
                    <Button
                        title={<FontAwesomeIcon style={{ fontSize: 12.3, color: "white", lineHeight: 0, margin: 0 }} icon={faCartShopping} />}
                        styles={{
                            cursor: "pointer",
                            height: "33px",
                            width: "33px",
                            borderRadius: "50%",
                            border: "1px solid white",
                            background: "transparent",
                        }}//#3700ff
                        onClicked={() => navigate("/nofications")}
                    />
                </div>
            )
        }
        return (
            <div className={styles.account}>
                <Cart />
                <Nofications />
                <User />
                <Bars />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <div className={styles.logo}>
                    <NewLink
                        link={"/"}
                        child={<p style={{ color: "white" }}> <FontAwesomeIcon icon={faHouse} />  Trang chủ </p>}
                    />
                </div>
                <Search />
                <Account />
            </div>
        </div>
    );
}

export default Header;