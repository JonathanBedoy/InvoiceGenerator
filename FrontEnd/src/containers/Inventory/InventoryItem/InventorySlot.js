import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import InputField from "../../../components/UI/InputField/InputField";
import formatPhoneNumber from "../../../functions/phoneFormatter";
import style from "./InventorySlot.module.css";

const InventorySlot = (props) => {
  const [valueOfSlot, setvalueOfSlot] = useState(props.value);

  const [phoneFormatted, setPhoneFormatted] = useState(
    formatPhoneNumber(valueOfSlot)
  );

  useEffect(() => {
    if (props.saveChange && !props.editting && valueOfSlot !== props.value) {
      const a = {};
      a[props.label] = valueOfSlot;
      props.editCommit(a);
    } else {
      setvalueOfSlot(props.value);
    }

    // if (props.label === 'phone') setPhoneFormatted(formatPhoneNumber(valueOfSlot))
  }, [props.editting]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.label === "phone")
      setPhoneFormatted(formatPhoneNumber(valueOfSlot));
  }, [valueOfSlot]); // eslint-disable-line react-hooks/exhaustive-deps

  // let inputType = ''

  // switch (props.type) {
  //   // case 'dropdown':
  //   //   inputType = <DropDown valueUpdate={handleChangeInput} options={props.options} />
  //   //   break;
  //   case 'number':
  //     inputType = 'number'
  //     break;

  //   default:
  //     break;
  // }

  return (
    <Container>
      <Row
        className={
          style.slotWrapper + ` ${props.other ? style.other : ""} py-1`
        }>
        {/* <Col md={1} xs={1}>
          <EditButton btnClick={() => setEditting(state => !state)} className={style.slotValue} />
        </Col> */}
        <Col
          md={4}
          xs={props.fullRow ? 12 : 4}
          className="text-right text-md-right">
          <span className={style.slotLabel}>
            {props.label.charAt(0).toUpperCase() + props.label.slice(1)}:
          </span>
        </Col>
        <Col
          className={` ${props.fullRow ? "text-center" : ""} text-md-left pr-0`}
          xs={props.fullRow ? 12 : 8}
          md={"8"}>
          {props.editting && props.label !== "id" ? (
            <InputField
              type={props.type}
              className={style.slotValue}
              value={valueOfSlot}
              valueUpdate={(a) => setvalueOfSlot(a)}
            />
          ) : (
            <span className={style.slotValue + " "}>
              {props.label === "phone" ? phoneFormatted : valueOfSlot}
            </span>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default InventorySlot;
