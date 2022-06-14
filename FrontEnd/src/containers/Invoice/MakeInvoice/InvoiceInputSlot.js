import React from 'react'
import { Col, Row } from 'react-bootstrap'
import DropDown from '../../../components/SelectDropDown/DropDown'
import InputField from '../../../components/UI/InputField/InputField'

const InvoiceInputSlot = (props) => {
  let inputType = <InputField />

  const handleChangeInput = (a, b) => {
    props.valueUpdate(a, props)
  }

  switch (props.type) {
    case 'dropdown':
      inputType = <DropDown valueUpdate={handleChangeInput} options={props.options} />
      break
    case 'number':
      inputType = <InputField type='number' valueUpdate={handleChangeInput} />
      break

    case 'text':
      inputType = <InputField type='text' valueUpdate={handleChangeInput} />
      break

    default:
      break
  }

  return (
    <Row className={` mt-3 d-flex justify-content-center`}>
      <Col xs={4} sm={2} md={2} lg={1} className={` col-1  pr-0 text-right`}>
        {props.label}:
      </Col>
      <Col xs={8} sm={7} md={5} lg={4} className={` col-4 `}>
        {inputType}
        {/* <DropDown /> */}
      </Col>
    </Row>
  )
}

export default InvoiceInputSlot
