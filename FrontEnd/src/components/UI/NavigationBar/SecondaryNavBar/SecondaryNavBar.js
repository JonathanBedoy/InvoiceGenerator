import React from "react";
import { Col, Row } from "react-bootstrap";
import BackButton from "../../BackButton/BackButton";
import style from './SecondaryNavBar.module.css'


const SecondaryNavBar = (props) => {

  return (
    <Row className={`${style.mainHeaderBar} mb-4 `}>
      {props.back ? (
        <Col col={1} sm={1} xs={2} className={`${style.backComponent}  text-center text-md-center `}>
        <BackButton redirect={props.back} />
      </Col>
      ) : ''}
      {/* <Col col={1} sm={1} xs={2} className={`${style.backComponent}  text-center text-md-center `}>
        {props.back ? <BackButton redirect={props.back} /> : ''}
      </Col> */}
      <Col className={`${style.titleText} pt-2 text-center`}>
        {props.title ? props.title : ''}
      </Col>
      {props.component1 ? (
        <Col col={1} sm={1} xs={2} className={`${style.component1}  text-center text-md-center `}>
          {props.component1}
        </Col>
      ) : ''}
      {props.component2 ? (
        <Col col={1} sm={1} xs={2} className={`${style.component1}  text-center text-md-center `}>
          {props.component2}
        </Col>
      ) : ''}

    </Row>
  )
}

export default SecondaryNavBar