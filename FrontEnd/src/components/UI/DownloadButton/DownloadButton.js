import React, { useState } from "react";
import { BsDownload } from "react-icons/bs";
// import { GrDocumentPdf } from "react-icons/gr";

import styles from './DownloadButton.module.css';



const DownloadButton = (props) => {

  const [hovering, setHovering] = useState(false)

  let iconToShow = !hovering ? <BsDownload /> : <BsDownload />

  return (
    <div className={styles.button + ' ' + props.className}>
      <span onClick={props.btnClick} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        <BsDownload />
        {iconToShow}
      </span>
    </div>

  )
}

export default DownloadButton;