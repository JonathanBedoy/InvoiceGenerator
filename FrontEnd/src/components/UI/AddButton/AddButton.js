import React, {  useState } from 'react';
import styles from './AddButton.module.css';
import { FaPlusSquare, FaRegPlusSquare } from 'react-icons/fa';

const AddButton = (props) => {

  const [hovering, setHovering] = useState(true)

  const changeIcon = (cond) => {
    setHovering(cond);
  }

  const clickHandler = () => {
    props.click()
  }

  // let iconToShow = hovering ? <FaRegPlusSquare /> : <FaPlusSquare />
  return (
    <span onClick={() => clickHandler()}
      className={styles.AddButton}
      onMouseEnter={() => changeIcon(false)}
      onMouseLeave={() => changeIcon(true)}
    >
      {hovering ? <FaRegPlusSquare /> : <FaPlusSquare />}
    </span>
  );
}


export default AddButton;