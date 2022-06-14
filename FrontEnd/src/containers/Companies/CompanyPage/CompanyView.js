import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import InventorySlot from "../../Inventory/InventoryItem/InventorySlot";
import { withRouter } from 'react-router-dom'
import { CompanyActions } from "../../../store/companiesSlice";
import EditButton from "../../../components/UI/EditButton/EditButton";
import Button from "../../../components/UI/Button/Button";
import InvoiceTable from "../../Invoice/InvoiceTable/InvoiceTable";
import { editSomethingsOnDb, removeSomethingsOnDbWithID } from "../../../store/populateStore/populateStore";
import TrashButton from "../../../components/UI/TrashButton/TrashButton";
import SecondaryNavBar from "../../../components/UI/NavigationBar/SecondaryNavBar/SecondaryNavBar";


const CompanyView = (props) => {

  const [editting, setEditting] = useState(false)
  const [saveChange, setSaveChange] = useState(false)

  const company = useSelector(state => state.company.company)
  const attributesNeeded = useSelector(state => state.company.attributesNeeded)
  const dispatch = useDispatch(CompanyActions)

  // console.log(props.match.params.id)

  const id = parseInt(props.match.params.id)

  const index = company.findIndex(ele => ele.id === id)

  const editItem = (item) => {
    if (saveChange) {
      dispatch(editSomethingsOnDb({ ...item, id }, 'company'))
      // dispatch(CompanyActions.editCompany({ ...item, id: id }))
      setSaveChange(false)
    }

  }

  const updateItems = (save) => {
    if (save) {
      setSaveChange(true)
    } else {
      setSaveChange(false)
    }
    setEditting(false)
  }

  const removeCompany = () => {
    console.log('removing from db')
    dispatch(removeSomethingsOnDbWithID({attributeLabel: 'id', attributeValue: id, attributeValueType: 'number'}, 'company'))
    props.history.push('/companies')
  }

  const standardKeys = [
    'name',
    'phone',
    'city',
    'street',
    'zipCode',
    'state',
    'description'
  ]

  const additionalKeys = Object.keys(company[index] ? company[index] : {})

  let slotsKeys = standardKeys.concat(additionalKeys)
  slotsKeys = slotsKeys.filter((item, index) => {
    return (slotsKeys.indexOf(item) === index)
  })
  const slots = company[index] ? slotsKeys.map((ele, indexOfEle) => {
    return (
      <Row key={ele} className={`p-0 m-0`}>
        <InventorySlot
          type={attributesNeeded[ele]}
          other={(indexOfEle % 2) === 0}
          editting={editting}
          editCommit={editItem}
          label={ele}
          value={company[index][ele]}
          saveChange={saveChange}
        />
      </Row>
    )
  }) : <span>Item Does not exist</span>

  // const [showModal, setShowModal] = useState(false)

  const editBtn = (
    <EditButton btnClick={() => setEditting(state => !state)}>Edit</EditButton>
  )
  const trashBtn = (
    <TrashButton btnClick={() => removeCompany()} caution={true} cautionText={'This will PERMANENTLY REMOVE the company and all their invoices!'} >Trash</TrashButton>
  )
  return (
    <Container className="m-0 p-0">
      <SecondaryNavBar
        component1={trashBtn}
        component2={editBtn}
        back={'/companies'}
        title={'Company Info'}
        
      />
      {/* <Row className={`${style.mainHeaderBar} mb-4 pb-2`}>
        <Col col={8} sm={9} xs={7}>
          <BackButton redirect={'/companies'} />
        </Col>
        <Col col={2} sm={2} xs={3} className="text-right text-md-right">
          <TrashButton caution={true} cautionText={'This will PERMANENTLY REMOVE the company and all their invoices!'} btnClick={() => setEditting(state => !state)}>Trash</TrashButton>
        </Col>
        <Col col={2} sm={1} xs={2} className="text-left text-md-left">
          <EditButton btnClick={() => setEditting(state => !state)}>Edit</EditButton>

        </Col>

      </Row> */}
      {slots}
      {editting ? <Row className="mt-5">
        <Col className="text-right">
          <Button click={() => updateItems(false)} outline type='danger'>Cancel</Button>
        </Col>
        <Col className="text-left mb-5">
          <Button click={() => updateItems(true)} outline type='success'>Save</Button>
        </Col>
      </Row> : false}

      {/* Display table of invoices */}
      {/* invoice id, total, hasPaid, date */}
      <InvoiceTable id={id} attributeType={'company'} />
    </Container>
  );


}

export default withRouter(CompanyView);