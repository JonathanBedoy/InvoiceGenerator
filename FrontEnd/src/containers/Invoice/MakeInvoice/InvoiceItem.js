import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import style from './MakeInvoice.module.css';
import InvoiceInputSlot from './InvoiceInputSlot'
import TrashButton from "../../../components/UI/TrashButton/TrashButton";

const InvoiceItem = (props) => {
  const trashBtn = <TrashButton size={'1.2rem'} btnClick={() => props.deleteItemHandler(props.itemNumber)} caution={false} cautionText={'This will PERMANENTLY REMOVE the invoice!'} />

  const [item, setItem] = useState({
    item: null,
    quantity: null,
    price: null
  })

  const updateHandler = (a, b) => {
    // console.log(b)
    setItem( state => {
      let temp = a
      if(b.type === 'dropdown') {
        temp = a.value
      }
        state[b.label.toLowerCase()] = temp
      return {...state}
    })
    // props.valueUpdate(a, {...props, label: 'item'})
  }

  useEffect(() => {
    props.valueUpdate(item, {...props, label: 'item'})
  }, [item]) //eslint-disable-line
  

  return (
    <div>
      <Row className={` ${style.title} mt-3 p-0 d-flex justify-content-center`}>
        <Col className={` ${style.item} p-0 m-0 col-6 col-xs-11 pt-1 pr-0 text-center`}>
          Item # {props.itemNumber + 1}
        </Col>
        <Col className={` ${style.item} p-0 m-0 col-1 col-xs-1 pt-0 pr-0 text-center`}>{trashBtn}</Col>
      </Row>

      <InvoiceInputSlot
        valueUpdate={updateHandler}
        options={props.options}
        label={'Item'}
        type='dropdown' />
      <InvoiceInputSlot
        valueUpdate={updateHandler}
        label={'Quantity'}
        type='number' />
      <InvoiceInputSlot
        valueUpdate={updateHandler}
        label={'Price'}
        type='number' />
    </div>
  )

}

export default InvoiceItem;