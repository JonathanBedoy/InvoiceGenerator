import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import style from './MakeInvoice.module.css';
import InvoiceInputSlot from './InvoiceInputSlot'

const InvoiceItem = (props) => {

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
      <Row className={`mt-3 d-flex justify-content-center`}>
        <Col className={` ${style.item} col-5 col-xs-12 pt-2 pr-0 text-center`}>
          Item # {props.itemNumber + 1}
        </Col>
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