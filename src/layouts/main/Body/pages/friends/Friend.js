import React, { useContext, useEffect, useState } from "react";
import styles from "./friend.module.scss"
import { useNavigate, useParams } from "react-router-dom";
import GlobalContext from "../../../../hooks/GlobalContext";
import getAPI from "../../../../../server/axios/getAPI";
import LinearText from "../../../../components/LinearText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

function Friend() {

    const { userInformations, IP } = useContext(GlobalContext)
    const navigate = useNavigate()

    const { id } = useParams()
    const [friendList, setFriendList] = useState([])
    useEffect(() => {
        if (id === userInformations._id) {
            const uniqueArr = userInformations.friends.filter((value, index) => {
                return userInformations.friends.indexOf(value) === index;
            });
            setFriendList(uniqueArr)
        } else {
            getAPI(`http://${IP}:5000/api/user/get`, {
                id: id
            }, (response) => {
                const uniqueArr = response.data.friends.filter((value, index) => {
                    return response.data.friends.indexOf(value) === index;
                });
                setFriendList(uniqueArr)
            })
        }
    }, [])
    // useEffect(() => {
    //     console.log(friendList)
    // },[friendList])
    const TagFriend = ({ id }) => {

        const [friendData, setFriendData] = useState(null)
        const onWatchingDetailInfo = () => {
            navigate(`/connect/find/${id}/info`)
        }
        useEffect(() => {
            getAPI(`http://${IP}:5000/api/user/get`, {
                id: id
            }, (response) => setFriendData(response.data))
        }, [])
        const mutualFriends = friendData?.friends.filter(friend => (userInformations.friends.includes(friend) && friend !== userInformations._id))
        return (
            <div className={styles.friendTag}>
                <div className={styles.friendConfigs}>
                    <FontAwesomeIcon color="#424242" icon={faGear}/>
                </div>
                <div className={styles.avatar}>
                    <img src={friendData?.avatar}></img>
                </div>
                <div className={styles.others}>
                    <div className={styles.name} onClick={onWatchingDetailInfo}>
                        <p>{friendData?.name}</p>
                    </div>
                    <div className={styles.mutualFriends}>
                        <p>Có {mutualFriends?.length} bạn chung</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <LinearText
                    title={"Bạn bè"}
                    fontSize={23}
                />
            </div>
            <div className={styles.main}>
                {friendList.map((tag, index) => <TagFriend
                    id={tag}
                    key={tag}
                />)}

            </div>
        </div>
    );
}

export default Friend;