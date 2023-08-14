import React, { useContext, useState } from "react";
import styles from "./login.module.scss"
import LinearText from "../../../../components/LinearText";
import Button from "../../../../components/Button";
import NewLink from "../../../../components/NewLink";
import GlobalContext from "../../../../hooks/GlobalContext";
import postAPI from "../../../../../server/axios/postAPI";
import { useNavigate } from "react-router-dom";

function Login() {

    const { setUserInformations, IP } = useContext(GlobalContext)
    const navigate = useNavigate()

    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = () => {
        // postAPI để gửi lên server kiểm tra
        postAPI(`http://${IP}:5000/api/user/login`, {
            nickname: nickname,
            password: password
        }, async (response) => {
            if (response.status === 200) {
                setUserInformations(response.data[0])
                navigate("/")
                localStorage.setItem("UID", response.data[0]._id)
                localStorage.setItem("accessToken", true)
            }
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <LinearText
                    title={"Đăng nhập"}
                    colors={["red", "blue"]}
                    fontSize={22}
                />
            </div>
            <div className={styles.inputs}>
                <input
                    value={nickname}
                    onChange={(e => setNickname(e.target.value))}
                    className={[styles.input, styles.nickname].join(" ")}
                    placeholder="Tài khoản"
                />
                <input
                    value={password}
                    onChange={(e => setPassword(e.target.value))}
                    className={[styles.input, styles.password].join(" ")}
                    placeholder="Mật khẩu"
                />
            </div>
            <div className={styles.others}>
                <p>Chưa có tài khoản? <NewLink link={"/register"} child={<span>Đăng kí</span>} /></p>
            </div>
            <div className={styles.submit}>
                <button onClick={handleSubmit} className={styles.submitBtn} style={{
                    cursor: "pointer",
                    padding: "10px 15px",
                    borderRadius: "7px",
                    border: 0
                }}>
                    <p style={{ margin: 0 }}>Đăng nhập</p>
                </button>
            </div>
        </div>
    );
}

export default Login;