import React, { useState } from 'react';
import styles from './TrashButton.module.css';
import { FaRegTrashAlt, FaTrashAlt } from 'react-icons/fa';
import CautionModal from '../Modal/CautionModal';

const TrashButton = (props) => {

  const [hovering, setHovering] = useState(true)
  const [showCautionModal, setShowCautionModal] = useState(false)

  const changeIcon = (cond) => {
    setHovering(cond);
  }

  const clickHandler = () => {
    if (props.caution) {
      setShowCautionModal(_state => true)
    } else {
      props.btnClick()
    }

  }

  const modalResponse = (response) => {
    setShowCautionModal(_state => false)
    if(response) {
      props.btnClick()
    }
  }
  // let textForCaution = 'This will PERMANENTLY REMOVE the company and all their invoices!'

  return (
    <div className='pt-1'>
      <CautionModal
        show={showCautionModal}
        cautionText={props.cautionText}
        modalClosed={(option) => modalResponse(option)}
        ContinueText={'Remove'}
        CancelText={'Cancel'}
        title={'Remove Warning'}
      />
      <div className={`${styles.TrashButton} `} 
      onClick={() => clickHandler()}
          
      onMouseEnter={() => changeIcon(false)}
      onMouseLeave={() => changeIcon(true)}
      >
        <span 
        >
          {hovering ? <FaRegTrashAlt /> : <FaTrashAlt />}
        </span>

        {/* <span className={`${styles.text}`}>Remove</span> */}
      </div>
    </div>

  );
}


export default TrashButton;