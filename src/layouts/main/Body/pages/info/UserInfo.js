import React, { useContext, useState } from "react";
import styles from "./userInfo.module.scss"
import GlobalContext from "../../../../hooks/GlobalContext";
import LinearText from "../../../../components/LinearText";
import putAPI from "../../../../../server/axios/putAPI";

function UserInfo() {

    const { userInformations, IP, setUserInformations } = useContext(GlobalContext)
    console.log(userInformations)
    const arr = [{
        nameKey: 'name',
        placeholder: "Tên"
    }, {
        nameKey: 'address',
        placeholder: "Địa chỉ"
    }, {
        nameKey: 'email',
        placeholder: "Email"
    }, {
        nameKey: 'phone',
        placeholder: "Số điện thoại"
    }]

    function InfoTag({ value, placeholder, nameKey }) {

        const [inpValue, setInpValue] = useState(value)

        const handleGetValue = (e) => {
            setInpValue(e.target.value)
            // kỹ thuật debounce để gọi API
        }
        const handleUpdate = async () => {
            await putAPI(`http://${IP}:5000/api/user/info/update`, {
                id: userInformations._id,
                nameKey: nameKey,
                value: inpValue
            }, async (response) => setUserInformations(response))
        }


        return (
            <div className={styles.infoTag}>
                <label>{placeholder}:</label>
                <input
                    onBlur={handleUpdate}
                    placeholder={placeholder}
                    value={inpValue}
                    onChange={(e) => handleGetValue(e)}
                />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <LinearText colors={['red', 'blue']} title={"Thông tin của bạn"} fontSize={23} />
            </div>
            <div className={styles.main}>
                {arr.map((data) => <InfoTag
                    key={data.nameKey}
                    value={userInformations[data.nameKey]}
                    placeholder={data.placeholder}
                    nameKey={data.nameKey}
                />)}
            </div>
        </div>
    );
}

export default UserInfo;