import React, { memo, useContext, useEffect, useRef, useState } from "react";
import styles from "./shop.module.scss"
import GlobalContext from "../../../../hooks/GlobalContext";
import getAPI from "../../../../../server/axios/getAPI";
import LinearText from "../../../../components/LinearText";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightLong, faCheck, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import putAPI from "../../../../../server/axios/putAPI";

function Shop() {

    const { IP, userInformations, setUserInformations } = useContext(GlobalContext)
    const [productList, setProductList] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getAPI(`http://${IP}:5000/api/shop/products/get`, {}, () => { }, async (response) => {
            setProductList(response.data)
            console.log(userInformations)
        })
    }, [])
    const goToBill = async () => {
        navigate("bill")
    }

    const ProductTag = memo(({ remaining, id, name, price, quanlity, sold, type, img, unit }) => {

        const imgCurrent = useRef("https://img6.thuthuatphanmem.vn/uploads/2022/11/17/anh-chibi-cute_014001732.png")
        const [newQuanlity, setNewQuanlity] = useState(quanlity)
        const quantityCurrent = useRef(quanlity)
        const [isSubmit, setIsSubmit] = useState(true)
        const dec = () => {
            if (newQuanlity > 0) {
                setNewQuanlity(newQuanlity - 1)
            }
        }
        const inc = () => {
            setNewQuanlity(newQuanlity + 1)
        }
        const onSubmit = async () => {
            // gọi API để thêm vào database
            // tìm xem sản phẩm này đã có trong giỏ hàng của người dùng chưa
            const isOrdered = userInformations.cart.order.filter(data => data._id === id)
            // nếu đã có sản phẩm này trong danh sách order của người dùng, lấy luôn số lượng sản phẩm có trong order
            if (isOrdered.length === 0) {
                await putAPI(`http://${IP}:5000/api/user/cart/update/create`, {
                    id: userInformations._id,
                    idP: id,
                    quanlity: newQuanlity
                })
            }
            await putAPI(`http://${IP}:5000/api/user/cart/update/quanlity`, {
                id: await userInformations._id,
                idP: id,
                quanlity: newQuanlity
            }, (response) => {
                console.log(response)
                setUserInformations(response.data)
            })
            setIsSubmit(true)
        }
        useEffect(() => {
            if(newQuanlity === Number(quantityCurrent.current)){
                setIsSubmit(true)
            }else{
                setIsSubmit(false)
            }
        }, [newQuanlity])

        useEffect(() => {
            // tìm xem sản phẩm này đã có trong giỏ hàng của người dùng chưa
            const isOrdered = userInformations.cart.order.filter(data => data._id === id)
            // nếu đã có sản phẩm này trong danh sách order của người dùng, lấy luôn số lượng sản phẩm có trong order
            if (isOrdered.length !== 0) {

                setNewQuanlity(isOrdered[0]?.quanlity)
                quantityCurrent.current = isOrdered[0]?.quanlity
            }
        }, [])

        return (
            <div className={styles.productTag}>
                <div className={styles.image}>
                    <img src={img ? img : imgCurrent.current} />
                </div>
                <div className={styles.info}>
                    <div className={styles.name}>
                        <p style={{ margin: 0 }}>{name}</p>
                    </div>
                    <div className={styles.price}>
                        <p>{`${price.toLocaleString('vi-VN')} đ`}/{unit ? unit : "phần"}</p>
                    </div>
                    <div className={styles.quantity}>
                        <div className={styles.tool}>
                            <div onClick={dec} className={styles.dec}>
                                <FontAwesomeIcon icon={faMinus} />
                            </div>
                            <div className={styles.newQuanlity}>
                                <input
                                    value={newQuanlity}
                                    className={styles.inputQuantity}
                                    onChange={(e) => setNewQuanlity(Number(e.target.value))}
                                />
                            </div>
                            <div onClick={inc} className={styles.inc}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                        <div onClick={onSubmit} className={styles.submitQuantity} style={{
                            backgroundColor: (isSubmit === false ? "#f5427e" : "lightgreen")
                        }}>
                            <FontAwesomeIcon style={{ fontSize: 12 }} icon={faCheck} />
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
                    title={"Danh mục sản phẩm"}
                    fontSize={22}
                    colors={['red', 'blue']}
                />
            </div>
            <div className={styles.main}>
                {productList.map((tag, index) => {
                    return <ProductTag
                        key={tag._id}
                        id={tag._id}
                        remaining={tag.remaining}
                        name={tag.name}
                        price={tag.price}
                        quanlity={tag.quanlity}
                        sold={tag?.sold}
                        type={tag?.type}
                        img={tag?.img}
                        isOrdered={tag.quanlity === 0 ? true : false}
                    />
                })}
            </div>
            <div onClick={goToBill} className={styles.goToBill}>
                <LinearText
                    title={<p>Đi tới trang thanh toán&nbsp;&nbsp;<FontAwesomeIcon style={{ color: 'black' }} icon={faArrowRightLong} /></p>}
                />
            </div>
        </div>
    );
}

export default Shop;