import React, { useContext, useEffect, memo, useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless"

import styles from "./bill.module.scss"
import GlobalContext from "../../../../../hooks/GlobalContext";
import putAPI from "../../../../../../server/axios/putAPI";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown, faArrowRightLong, faCheck, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import LinearText from "../../../../../components/LinearText";

function Bill() {

    const { userInformations, IP, setUserInformations } = useContext(GlobalContext)
    const [totalCost, setTotalCost] = useState(0)
    const [orderList, setOrderList] = useState([])
    const [discount, setDiscount] = useState(0)
    const [conditions, setConditions] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState("Chọn phương thức nhận hàng")

    function init() {
        putAPI(`http://${IP}:5000/api/user/cart/pay`, {
            id: userInformations._id,
            discount: discount
        }, (response) => {
            setTotalCost(response.cart.payment.total)
            setOrderList(response.cart.order)
        })
    }
    useEffect(() => {
        setDiscount(userInformations.cart.payment.discounted)
    }, [])
    useEffect(() => {
        init()
    }, [userInformations.cart.order, discount])
    useEffect(() => {
        // console.log(discount)
    }, [discount])
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
            if (newQuanlity === Number(quantityCurrent.current)) {
                setIsSubmit(true)
            } else {
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
            <div className={styles.tag}>
                <div className={styles.productTag}>
                    <div className={styles.image}>
                        <img src={img ? img : imgCurrent.current} />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.name}>
                            <p style={{ margin: 0 }}>{name}</p>
                        </div>
                        <div className={styles.price}>
                            <p style={{ margin: 0 }}>{`${price.toLocaleString('vi-VN')} đ`}/{unit ? unit : "phần"}</p>
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
                <div className={styles.arrow}>
                    <FontAwesomeIcon icon={faArrowRightLong} />
                </div>
                <div className={styles.review}>
                    <div className={styles.reviewPrivate}>
                        <p>{`${newQuanlity} x ${price.toLocaleString('vi-VN')}đ`}</p>
                        <p className={styles.total}>{(newQuanlity * price).toLocaleString('vi-VN')}đ</p>
                    </div>
                </div>
            </div>
        )
    })
    const PromoteCodeTag = memo(({ discounted, conditions, expiry }) => {

        function onSelect() {
            if (Number(conditions.minTotal) < (100 * totalCost / (100 - discount)) &&
                (100 * totalCost / (100 - discount)) < Number(conditions.maxTotal)) {
                setDiscount(Number(discounted))
            }
            setConditions(conditions)
        }
        const now = new Date()
        now.setDate(now.getDate() + 10)


        function caculateDifferenceTime(timeA, timeB) {
            const distance = timeA - timeB
            return Math.floor(distance / (1000 * 60 * 60 * 24));
        }

        return (
            <Tippy
                interactive={true}
                placement="right"
                offset={[0, 0]}
                render={attr => (
                    <div className={styles.condition} {...attr} tabIndex={"-1"}>
                        <p style={{ margin: 0 }}>Hạn sử dụng còn: <span style={{ color: "red" }}>{caculateDifferenceTime(now, expiry)}&nbsp;ngày</span></p>
                        <p style={{ margin: 0 }}>Hạn mức đơn hàng:&nbsp;
                            <span style={{
                                color: ((100 * totalCost / (100 - discount)) > conditions.minTotal ? "green" : "red")
                            }}>{(conditions.minTotal / 1000).toLocaleString('vi-VN')}k</span>
                            {`< ${(100 * totalCost / (100 - discount) / 1000).toLocaleString('vi-VN')}k <`}
                            <span style={{
                                color: ((100 * totalCost / (100 - discount)) < conditions.maxTotal ? "green" : "red")
                            }}>{(conditions.maxTotal / 1000).toLocaleString('vi-VN')}k</span>
                        </p>
                    </div>
                )}
            >
                <div onClick={onSelect} style={{ width: "100%" }} value={Number(discount)} className={styles.promoteCodeTag}>
                    Thẻ giảm giá {discounted}%
                </div>
            </Tippy>
        )
    })
    const PaymentTag = memo(({ title }) => {

        const onSelect = () => {
            setPaymentMethod(title)
        }

        return (
            <div onClick={onSelect} className={styles.paymentTag}>
                <p style={{ margin: 0 }}>{title}</p>
            </div>
        )
    })
    useEffect(() => {
        if (Number(conditions?.minTotal) > (100 * totalCost / (100 - discount)) ||
            (100 * totalCost / (100 - discount)) > Number(conditions?.maxTotal)) {
            setDiscount(0)
        }
    }, [totalCost])

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <LinearText
                    title={"Giỏ hàng"}
                    colors={["blue, yellow"]}
                />
            </div>
            <div className={styles.contents}>
                <div className={styles.options}>
                    <div className={styles.titleOptions}>
                        <LinearText
                            title={"Tùy chọn"}
                            colors={["#7373fa", "blue"]}
                            fontSize={20}
                        />
                    </div>
                    <div className={styles.mainOptions}>
                        <div className={styles.selectPromoteCodes}>
                            <h4>Thẻ giảm giá:</h4>
                            {userInformations.cart.promoteCodes.length !== 0 ? (
                                <Tippy
                                    placement="bottom"
                                    interactive={true}
                                    offset={[0, 1]}
                                    render={attr => (
                                        <div className={styles.codes} tabIndex="-1" {...attr}>
                                            {userInformations.cart.promoteCodes.map((promoteCodeTag, index) => <PromoteCodeTag
                                                discounted={promoteCodeTag.discount}
                                                conditions={promoteCodeTag.condition}
                                                // expiry={promoteCodeTag.expiry}
                                                expiry={new Date()}
                                                key={index}
                                            />)}
                                        </div>
                                    )}
                                >
                                    <div style={{ padding: "8px 5px", display: "flex", border: "1px solid black", flex: 1, justifyContent: "center" }}>
                                        {discount === 0 ? (
                                            <p style={{
                                                margin: 0
                                            }}>Chọn thẻ giảm giá&nbsp;<FontAwesomeIcon icon={faArrowDown} /></p>
                                        ) : (
                                            <p style={{
                                                margin: 0
                                            }}>Giảm giá&nbsp;{discount}%</p>
                                        )}
                                    </div>
                                </Tippy>
                            ) : (
                                <select>
                                    <option>Chưa có thẻ giảm giá</option>
                                </select>
                            )}
                        </div>
                        <div className={styles.selectPaymentMethod}>
                            <h4 style={{ flex: 1 }}>Phương thức nhận hàng:</h4>
                            <Tippy
                                placement="bottom"
                                interactive={true}
                                offset={[0, 0]}
                                render={attr => (
                                    <div className={styles.paymentMethod} tabIndex={"-1"} {...attr}>
                                        <PaymentTag 
                                            title={"Giao hàng tại nhà"}
                                        />
                                        <PaymentTag
                                            title={"Đặt trước tại cửa hàng"}
                                        />
                                    </div>
                                )}
                            >
                                <div className={styles.methods}>
                                    <p style={{ margin: 0 }}>{paymentMethod}</p>
                                </div>
                            </Tippy>
                        </div>
                    </div>
                </div>
                <div className={styles.main}>
                    {orderList.map((tag, index) => {
                        if (tag.quanlity > 0) {
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
                        }
                    })}
                    <div className={styles.all}>
                        <div className={styles.allTitle}>
                            <p>Tổng:&nbsp;{discount !== 0 ? `(-${discount}%)` : ""}</p>
                        </div>
                        <div className={styles.cost}>
                            {discount !== 0 ? (
                                <p className={styles.promote}>{(100 * totalCost / (100 - discount)).toLocaleString('vi-VN')}đ</p>
                            ) : ""}
                            <LinearText
                                title={`${totalCost.toLocaleString('vi-VN')}đ`}
                                colors={["#00942a", "#4b945c"]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bill;