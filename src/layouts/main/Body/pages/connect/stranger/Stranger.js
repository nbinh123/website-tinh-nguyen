import React, { useContext, useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless"

import getAPI from "../../../../../../server/axios/getAPI"
import styles from "./stranger.module.scss"
import GlobalContext from "../../../../../hooks/GlobalContext";
import { useParams } from "react-router-dom";
import Button from "../../../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClockRotateLeft, faUserCheck, faUserPlus, faX } from "@fortawesome/free-solid-svg-icons";
import postAPI from "../../../../../../server/axios/postAPI";
import { response } from "express";

function Stranger() {

    const { userInformations, IP } = useContext(GlobalContext)
    const { id } = useParams()
    const [strangerData, setStrangerData] = useState(null)
    // console.log(userInformations._id)

    useEffect(() => {
        console.log(strangerData)
    }, [strangerData])
    useEffect(() => {
        getAPI(`http://${IP}:5000/api/user/get`, {
            id: id
        }, () => { }, (response) => {
            setStrangerData(response.data)
        })
    }, [])
    function Info() {
        return (
            <div className={styles.info}>
                <div className={styles.name}>
                    <p>{strangerData?.name}</p>
                </div>
                <div className={styles.introduce}>
                    <p>Giới thiệu: </p>
                    <p>{strangerData?.introduce ? strangerData?.introduce : `Xin chào, mình tên là ${strangerData?.name}`}</p>
                </div>
                <div className={styles.email}>
                    <p>Email: </p>
                    <p>{strangerData?.email}</p>
                </div>
                <div className={styles.birth}>
                    <p>Ngày sinh: </p>
                    <p>{strangerData?.birth}</p>
                </div>
                <div className={styles.phone}>
                    <p>SĐT: </p>
                    <p>{strangerData?.phone ? strangerData?.phone : "Chưa cập nhật SĐT"}</p>
                </div>
                <div className={styles.foreignURL}>
                    <p>Liên kết: </p>
                    {strangerData?.foreignURL !== undefined ? (
                        <a href={strangerData?.foreignURL}>{strangerData?.foreignURL}</a>
                    ) : (
                        <p>Chưa cập nhật liên kết</p>
                    )}
                </div>
                {!strangerData?.config.onShareLocation ? (
                    <div className={styles.address}>
                        <p>Địa chỉ: </p>
                        <p>{strangerData?.address ? strangerData?.address : "Chưa cập nhật địa chỉ"}</p>
                    </div>
                ) : ""}
            </div>
        )
    }
    function Tool() {

        const isFriend = (strangerData?.friends.includes(userInformations._id))
        const handleSomething = async () => {
            if (!isFriend && !strangerData?.waitingAddFriendResponse.includes(userInformations._id)) {
                // gọi API để gửi lời mời kết bạn
                await postAPI(`http://${IP}:5000/api/user/friend/request`, {
                    myId: userInformations._id,
                    theirId: id
                }, (response) => {
                    setStrangerData(response)
                })
            }
            if (!isFriend && strangerData?.waitingAddFriendResponse.includes(userInformations._id)) {
                // gọi API để hủy lời mời kết bạn
                await postAPI(`http://${IP}:5000/api/user/friend/request/cancel`, {
                    myId: userInformations._id,
                    theirId: id
                }, (response) => {
                    setStrangerData(response)
                })
            }
        }
        const rejectFriendRequest = () => {
            // gọi API để hủy lời mời kết bạn
            // postAPI(`http://${IP}:5000/api/user/friend/request/reject`, {
            //     myId: userInformations._id,
            //     theirId: id
            // }, (response) => { 
            //     console.log(response) 
            // })
        }
        const acceptFriendRequest = () => {
            // gọi API để đồng ý lời mời kết bạn
        }

        return (
            <div className={styles.tool}>
                {userInformations.waitingAddFriendResponse.includes(id) ? (
                    <div className={styles.sel}>
                        <div className={styles.titleSelect}>
                            <p style={{ textAlign: "center" }}>Xác nhận lời mời kết bạn</p>
                        </div>
                        <div className={styles.select}>
                            <div className={styles.rej} onClick={rejectFriendRequest}>
                                <p>Từ chối&nbsp;<FontAwesomeIcon icon={faX}/></p>
                            </div>
                            <div className={styles.acp}>
                                <p>Đồng ý&nbsp;<FontAwesomeIcon icon={faCheck}/></p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.center}>
                        <div className={styles.status}>
                            <p>{isFriend ? "Các bạn đã là bạn bè" : "Các bạn chưa là bạn bè"}</p>
                        </div>
                        <div className={styles.toggle} onClick={handleSomething}>
                            {/* <FontAwesomeIcon icon={faUserPlus}/> */}
                            <p>{isFriend ? <FontAwesomeIcon icon={faUserCheck} /> : (
                                strangerData?.waitingAddFriendResponse.includes(userInformations._id) ? <FontAwesomeIcon icon={faClockRotateLeft} /> :
                                    <FontAwesomeIcon icon={faUserPlus} />
                            )}</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img src={strangerData?.img ? strangerData?.img : "https://chungkhoantaichinh.vn/wp-content/uploads/2022/12/hinh-meo-cute-chibi-10.jpg"}></img>
            </div>
            <Tool />
            <Info />
        </div>
    );
}

export default Stranger; 