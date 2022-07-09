import React, { useState } from "react";
// import { MdOutlineMoneyOff } from "react-icons/md";
import { FcPaid } from "react-icons/fc";
import { MdMoneyOff, MdAttachMoney } from "react-icons/md";
import styles from './MoneyButton.module.css';



const MoneyButton = (props) => {

  const [hovering, setHovering] = useState(false)

  let iconToShow = hovering ? <MdAttachMoney /> : <MdMoneyOff />
  
  return (
    <div className={styles.button + ' ' + props.className}>
      <span onClick={props.btnClick} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        { props.status ? <MdAttachMoney color="green" /> : <MdMoneyOff color="#9f0f0f" />}
        {/* {iconToShow} */}
      </span>
    </div>
  )
}

export default MoneyButton;