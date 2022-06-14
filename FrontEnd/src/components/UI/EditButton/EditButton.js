import React, { useState } from "react";
import { AiFillEdit, AiOutlineEdit } from "react-icons/ai";
import styles from './EditButton.module.css';



const EditButton = (props) => {

  const [hovering, setHovering] = useState(false)

  let iconToShow = hovering ? <AiFillEdit /> : <AiOutlineEdit />

  return (
    <span onClick={props.btnClick} className={styles.EditButton + ' '+ props.className} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      {iconToShow}
    </span>
  )
}

export default EditButton;