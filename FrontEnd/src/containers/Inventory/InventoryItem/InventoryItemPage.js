import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import InventorySlot from "./InventorySlot";
import { withRouter } from 'react-router-dom'
import { InventoryActions } from "../../../store/inventorySlice";
import EditButton from "../../../components/UI/EditButton/EditButton";
import Button from "../../../components/UI/Button/Button";
import Loader from '../../../components/UI/Loader/Loader'
import { editSomethingsOnDb, removeSomethingsOnDbWithID } from "../../../store/populateStore/populateStore";
import SecondaryNavBar from "../../../components/UI/NavigationBar/SecondaryNavBar/SecondaryNavBar";
import TrashButton from "../../../components/UI/TrashButton/TrashButton";


const InventoryItemPage = (props) => {

  const [editting, setEditting] = useState(false)
  const [saveChange, setSaveChange] = useState(false)
  const [loading, setLoading] = useState(true)
  const [itemNotExist, setItemNotExist] = useState(false)

  const inventory = useSelector(state => state.inventory.inventory)
  const attributesNeeded = useSelector(state => state.inventory.attributesNeeded)
  const dispatch = useDispatch(InventoryActions)


  const id = parseInt(props.match.params.id)

  const index = inventory.findIndex(ele => ele.id === id)

  const editItem = (item) => {
    if (saveChange) {
      dispatch(editSomethingsOnDb({...item, id},'inventory'))
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

  const standardKeys = [
    'description',
    // 'name',
    'brand',
    'quantity',
  ]

  useEffect(() => {
    if (index === -1 && inventory.length !== 0) {
      setLoading(false)
      setItemNotExist(true)
    } else if (index !== -1) {
      setLoading(false)
    }

    return () => {

    }
  }, [inventory])

  const additionalKeys = index !== -1 ? Object.keys(inventory[0]) : []

  let slotsKeys = standardKeys.concat(additionalKeys)
  slotsKeys = slotsKeys.filter((item, currIndex) => {
    return (slotsKeys.indexOf(item) === currIndex)
  })
  const slots = inventory[index] && !itemNotExist ? slotsKeys.map((ele, indexOfEle) => {
    return <Row key={ele}>
      <InventorySlot
        type={attributesNeeded[ele]}
        other={(indexOfEle % 2) === 0}
        editting={editting}
        editCommit={editItem}
        label={ele}
        value={inventory[index][ele]}
        saveChange={saveChange}
      />
    </Row>
  }) : <span>Item Does not exist</span>

  const removeInventoryHandler = () => {
    dispatch(removeSomethingsOnDbWithID({attributeLabel: 'id', attributeValue:id, attributeValueType: 'number'}, 'inventory'))
    props.history.push('/inventory')
  }

  // const itemProblem = () => {
  //   if (itemNotExist) return (<span>Item Does Not Exist.</span>)
  //   if(loading) return <Loader />
  //   return slots
  // }
  const editBtn = <EditButton btnClick={() => setEditting(state => !state)} />
  const trashBtn = <TrashButton btnClick={removeInventoryHandler} caution={true} cautionText={'This will PERMANENTLY REMOVE the item and all invoices associated with it!'} />

  return (
    <Container className={'m-0 p-0'}>
      <SecondaryNavBar 
        back={'/inventory'}
        component2={editBtn}
        component1={trashBtn}
      />
      {/* <Row>
        <Col>
          <BackButton redirect={'/inventory'} />
        </Col>
        <Col className="text-right text-md-center">
          <EditButton btnClick={() => setEditting(state => !state)} />
        </Col>

      </Row> */}
      {loading ? <Loader /> : slots}
      {editting ? <Row className="mt-5">
        <Col className="text-right">
          <Button click={() => updateItems(false)} outline type='danger'>Cancel</Button>
        </Col>
        <Col className="text-left">
          <Button click={() => updateItems(true)} outline type='success'>Save</Button>
        </Col>
      </Row> : ''}




    </Container>
  );


}

export default withRouter(InventoryItemPage);