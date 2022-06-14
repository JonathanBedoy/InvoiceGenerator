import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/UI/Button/Button";
import EditButton from "../../components/UI/EditButton/EditButton";
import Loader from "../../components/UI/Loader/Loader";
import SecondaryNavBar from "../../components/UI/NavigationBar/SecondaryNavBar/SecondaryNavBar";
import TrashButton from "../../components/UI/TrashButton/TrashButton";
import { editSomethingsOnDb, removeSomethingsOnDbWithID } from "../../store/populateStore/populateStore";
import InventorySlot from "../Inventory/InventoryItem/InventorySlot";
import InvoiceTable from "../Invoice/InvoiceTable/InvoiceTable";

const SellerView = (props) => {

  const [editting, setEditting] = useState(false)
  const [saveChange, setSaveChange] = useState(false)
  const [loading, setLoading] = useState(true)
  const [itemNotExist, setItemNotExist] = useState(false)

  const sellers = useSelector(state => state.seller.sellers)
  const attributesNeeded = useSelector(state => state.seller.attributesNeeded)
  const dispatch = useDispatch()

  // console.log(props.match.params.id)

  const id = parseInt(props.match.params.id)

  const index = sellers.findIndex(ele => ele.id === id)

  const editSeller = (item) => {
    if (saveChange) {
      dispatch(editSomethingsOnDb({...item, id},'seller'))
      // dispatch(InventoryActions.editInventoryItem({ ...item, id: id }))
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
  // console.log(index)

  const standardKeys = [
    'name',
    'phone',
    'street',
    'city',
    'state',
    'zipCode',
  ]

  useEffect(() => {
    if (index === -1 && sellers.length !== 0) {
      setLoading(false)
      setItemNotExist(true)
    } else if (index !== -1) {
      setLoading(false)
    }

    return () => {

    }
  }, [sellers])

  const additionalKeys = index !== -1 ? Object.keys(sellers[0]) : []

  let slotsKeys = standardKeys.concat(additionalKeys)
  slotsKeys = slotsKeys.filter((item, currIndex) => {
    return (slotsKeys.indexOf(item) === currIndex)
  })
  const slots = sellers[index] && !itemNotExist ? slotsKeys.map((ele, indexOfEle) => {
    return <Row key={ele}>
      <InventorySlot
        type={attributesNeeded[ele]}
        other={(indexOfEle % 2) === 0}
        editting={editting}
        editCommit={editSeller}
        label={ele}
        value={sellers[index][ele]}
        saveChange={saveChange}
      />
    </Row>
  }) : <span>Item Does not exist</span>

  const removeSellerHandler = () => {
    dispatch(removeSomethingsOnDbWithID({attributeLabel:'id', attributeValue:id, attributeValueType:'number'}, 'seller'))
    props.history.push('/seller')
  }


  const editBtn = (
    <EditButton btnClick={() => setEditting(state => !state)}>Edit</EditButton>
    )
  const trashBtn = (
    <TrashButton btnClick={removeSellerHandler} caution={true} cautionText={'This will PERMANENTLY REMOVE the Seller and all their invoices!'} >Trash</TrashButton>
  )

  return (
    <Container className="p-0 m-0">
      <SecondaryNavBar 
        back={'/seller'}
        component2={editBtn}
        component1={trashBtn}
        title={'Seller View'}
      />
      {/* <Row className="p-0 m-0">
        <Col>
          <BackButton redirect={'/seller'} />
        </Col>
        <Col className=" p-0 m-0 text-right text-md-center">
          <EditButton btnClick={() => setEditting(state => !state)}>Edit</EditButton>
        </Col>

      </Row> */}
      {loading ? <Loader /> : slots}
      {editting ? <Row className="mt-5">
        <Col className="text-right p-0 m-0">
          <Button click={() => updateItems(false)} outline type='danger'>Cancel</Button>
        </Col>
        <Col className="text-left mb-5">
          <Button click={() => updateItems(true)} outline type='success'>Save</Button>
        </Col>
      </Row> : false}

      {/* Display table of invoices */}
      {/* invoice id, total, hasPaid, date */}
      <InvoiceTable id={id} attributeType={'seller'} />
    </Container>
  );
}

export default SellerView