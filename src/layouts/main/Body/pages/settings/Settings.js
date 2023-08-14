import React, { useContext, useEffect, useRef, useState, memo } from "react";
import styles from "./setting.module.scss"
import LinearText from "../../../../components/LinearText";
import GlobalContext from "../../../../hooks/GlobalContext";
import putAPI from "../../../../../server/axios/putAPI";

function Setting() {

    const { userInformations, IP, setUserInformations } = useContext(GlobalContext)
    const [config, setConfig] = useState(null)
    const [list, setList] = useState([{
        index: 1,
        title: "Chia sẻ địa chỉ",
        value: userInformations.config.onShareLocation
    },{
        index: 2,
        title: "Nhận tin nhắn từ người lạ",
        value: userInformations.config.onReceiveFromStranger
    },{
        index: 3,
        title: "Nhận thông báo ưu đãi",
        value: userInformations.config.onGetPromoteNofications
    }])

    useEffect(() => {
        setConfig(userInformations.config)
    },[])
    
    const ConfigTag = memo(({ value, title, index }) => {

        const [isTrue, setIsTrue] = useState(value)

        const onToggle = async () => {
            await putAPI(`http://${IP}:5000/api/user/config/update`, {
                which: index,
                id: userInformations._id,
                boo: !isTrue,
            }, (response) => {
                console.log(response.config)
                setUserInformations(response)
                setList([{
                    index: 1,
                    title: "Chia sẻ địa chỉ",
                    value: response.config.onShareLocation
                },{
                    index: 2,
                    title: "Nhận tin nhắn từ người lạ",
                    value: response.config.onReceiveFromStranger
                },{
                    index: 3,
                    title: "Nhận thông báo ưu đãi",
                    value: response.config.onGetPromoteNofications
                }])
            })
            setIsTrue(!isTrue)
        }

        return (
            <div className={styles.configTag}>
                <div className={styles.titleTag}>
                    <p style={{ margin: 0 }}>{title}</p>
                </div>
                <div className={styles.check}>
                    <div onClick={onToggle} className={styles.hcn} style={{
                        justifyContent: (isTrue ? "right" : "left"),
                        backgroundColor: (isTrue ? "#359c02" : "#e0ffd1")
                    }}>
                        <div className={styles.circle} style={{
                            backgroundColor: (isTrue ? "lightgreen" : "#757575")
                        }}>

                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (  
        <div className={styles.container}>
            <div className={styles.title}>
                <LinearText
                    title={"Cài đặt"}
                    fontSize={22}
                />
            </div>
            <div className={styles.main}>
                {list.map((tag, index) => <ConfigTag
                    key={tag.index}
                    index={tag.index}
                    title={tag.title}
                    value={tag.value}
                />)}
            </div>
        </div>
    );
}

export default Setting;