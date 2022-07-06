import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import style from './MakeInvoice.module.css';
import InvoiceInputSlot from './InvoiceInputSlot'
import TrashButton from "../../../components/UI/TrashButton/TrashButton";

const InvoiceItem = (props) => {
  const trashBtn = <TrashButton size={'1.2rem'} btnClick={() => props.deleteItemHandler(props.itemNumber)} caution={false} cautionText={'This will PERMANENTLY REMOVE the invoice!'} />

  // console.log(props.info)
  // TODO FILL THIS OUT
  const [item, setItem] = useState({
    item: props.defaultValue ? props.defaultValue.value  : null,
    quantity: props.defaultQuantity ? props.defaultQuantity : null,
    price: props.defaultPrice ? props.defaultPrice : null
  })
  // console.log(item.item, item.quantity, item.price, props.defaultValue ? props.defaultValue.value: 'np')

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
    props.valueUpdate(item, {...props, label: 'item'})
  }

  // useEffect(() => {
  //   // console.log('HEREREREERERERR',item.item)
  //   if (item.item)
  //     props.valueUpdate(item, {...props, label: 'item'})
  // }, [item]) //eslint-disable-line

  useEffect(() => {
    // console.log('changing local state', props.info, item)
    setItem( state => {
       return {
          item: props.defaultValue.value,
          quantity: props.defaultQuantity ? props.defaultQuantity : state.quantity,
          price: props.defaultPrice ? props.defaultPrice : state.defaultPrice
        }
    })
  }, [props.defaultValue, props.defaultQuantity, props.defaultPrice])

//   let deafultVal = {label: 'Misnx', value: {brand: "Nia Lashes By Denise",
// description: "Boss Babe",
// id: 111820,
// name: "",
// quantity: -4,
// type: "Silk"}}
  

  return (
    <div>
      <Row className={` ${style.title} mt-3 p-0 d-flex justify-content-center`}>
        <Col className={` ${style.item} p-0 m-0 col-6 col-xs-11 pt-1 pr-0 text-center`}>
          Item # {props.itemNumber + 1}
        </Col>
        <Col className={` ${style.item} p-0 m-0 col-1 col-xs-1 pt-0 pr-0 text-center`}>{trashBtn}</Col>
      </Row>

      <InvoiceInputSlot
        defaultValue={props.defaultValue ? props.defaultValue : ''}
        valueUpdate={updateHandler}
        options={props.options}
        label={'Item'}
        type='dropdown' />
      <InvoiceInputSlot
        defaultValue={props.defaultQuantity ? props.defaultQuantity : false}
        valueUpdate={updateHandler}
        label={'Quantity'}
        type='number' />
      <InvoiceInputSlot
        defaultValue={props.defaultPrice ? props.defaultPrice : false}
        valueUpdate={updateHandler}
        label={'Price'}
        type='number' />
    </div>
  )

}

export default InvoiceItem;