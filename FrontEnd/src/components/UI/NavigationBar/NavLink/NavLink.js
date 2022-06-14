import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink, withRouter } from "react-router-dom";

const navLink = (props) => {
  let activated = props.location.pathname.includes(props.to);
  return (
    <Nav.Link
      as={NavLink}
      style={{
        borderBottom: activated ? "solid 1px rgba(0, 0, 0, 0.4)" : null,
      }}
      active={activated}
      to={props.to}>
      <span style={{ fontSize: "20px" }}>{props.children}</span>
    </Nav.Link>
  );
};

export default withRouter(navLink);
