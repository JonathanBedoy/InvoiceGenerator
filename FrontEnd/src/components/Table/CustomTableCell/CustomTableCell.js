import React from "react";
import { withRouter } from "react-router-dom";
const CustomTableCell = (props) => {

  const redirectThem = (newLoc) => {
    // props.history.push(newLoc)
  }

  return (
    <div >
      <button onClick={redirectThem(props.redirect)}>
        {props.value}
      </button>
    </div>

  )
}

export default withRouter(CustomTableCell);