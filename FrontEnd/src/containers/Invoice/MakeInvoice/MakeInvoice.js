// TODO: if passed an id, and that id exists in the invoiceList.
    // Then we should pre-Populate that invoice Info here.
    // Also the btn should say cancel or save changes

// In terms of how that will be stored in the DB...
// we have to recreate withInfo obj
// if item does not exist, then do not include it

import React, {  useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import style from './MakeInvoice.module.css'
import InvoiceItem from "./InvoiceItem";
import InvoiceInputSlot from "./InvoiceInputSlot";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import { withRouter } from "react-router-dom";
import { InvoiceActions } from "../../../store/invoiceSlice";
import { generateInvoiceNumber, generatePrepulateEditInvoiceInfo } from "../../../store/InvoiceFunctions/InvoiceFunctions";
import { addInvoice } from "../../../store/populateStore/populateStore";
import SecondaryNavBar from "../../../components/UI/NavigationBar/SecondaryNavBar/SecondaryNavBar";
const MakeInvoice = (props) => {

  const dispatch = useDispatch(InvoiceActions)
  
  const companies = useSelector(state => {
    return state.company.company.map(ele => {
      return { value: ele, label: ele.name }
    })
  })
  const inventory = useSelector(state => {
    return state.inventory.inventory.map(ele => {
      return { value: ele, label: ele.description }
    })
  })
  const seller = useSelector(state => {
    return state.seller.sellers.map(ele => {
      return { value: ele, label: ele.name }
    })
  })
  const invoices = useSelector(state => state.invoice.invoices)
  // check if there is an invoice to edit.
  // if there is, then we should get the info of that invoice and prepopulate the page
  const invoiceId = props.match.params.id
  const [edit, setEdit] = useState(false)
  // TODO: prepopulate has to get the actual info (this is test)
  let prepopulateInfo = undefined
  
  // console.log(invoices, prepopulateInfo, generatePrepulateEditInvoiceInfo(invoices, invoiceId))
  useEffect(() => {
    if (invoiceId !== undefined) {
      prepopulateInfo = generatePrepulateEditInvoiceInfo(invoices, invoiceId)
      
      setEdit(prepopulateInfo !== undefined)
      if (edit) {
        console.log(prepopulateInfo.invoiceInfo, 'SETTING INVOICEINFO')
        setItems(prepopulateInfo.items)
        setInvoiceInfo(() => { return {
          company: prepopulateInfo.invoiceInfo.company,
          po: prepopulateInfo.invoiceInfo.po,
          seller: prepopulateInfo.invoiceInfo.seller,
          taxRate: prepopulateInfo.invoiceInfo.taxRate,
          date: prepopulateInfo.invoiceInfo.date,
          dateVal: prepopulateInfo.invoiceInfo.dateVal
        }})
        setDefaultCompany({
          value: prepopulateInfo.invoiceInfo.company,
          label: prepopulateInfo.invoiceInfo.company.name
        })
        console.log(invoiceInfo)
      }
    }
  
  }, [invoices, edit])
  
  if (invoiceId !== undefined) {
    console.log('weve got to preload invoice info', invoiceId)
  }
  // console.log(invoiceExistData)
  const [defaultCompany, setDefaultCompany] = useState(undefined)
  const [invoiceInfo, setInvoiceInfo] = useState(() => {
    let invoiceTemplate
    if (edit && prepopulateInfo !== undefined) invoiceTemplate = prepopulateInfo.invoiceInfo
    else invoiceTemplate = {
      company: null,
      po: null,
      seller: null,
      taxRate: 0,
      date: new Date(new Date().toLocaleDateString('en-ca')),
      dateVal: new Date().toLocaleDateString('en-ca')
    }
    return invoiceTemplate
  })
  const [items, setItems] = useState(() => {
    // console.log(edit ? prepopulateInfo.items : [{}])
    return edit && prepopulateInfo !== undefined ? prepopulateInfo.items : [{}]
  })  
  const addAnotherItem = () => {
    setItems(a => {
      return [...a, {}]
    })
  }
  
  const removeItemHandler = (i) => {
    console.log('removing: ', items[i], i)
    setItems(state => {
      state.splice(i, 1)
      // return state
      console.log(state)
      return [...state]
    })
  }
  
  const updateItem = (updatedItem, info) => {
    if (info.type === 'text') setInvoiceInfo(state => {
      return { ...state, 'po': updatedItem }
    })
    else if (info.label.toLowerCase() === 'item') {
      // console.log('changing Item', updatedItem)
      // console.log(updatedItem)
      setItems(state => {
        state[info.itemNumber] = updatedItem
        return [...state]
      })

    } else if ((info.label.replace(/\s+/g, '')).toLowerCase() === 'taxrate') {
      setInvoiceInfo(state => {
        state['taxRate'] = updatedItem
        return { ...state }
      })
    } else {
      setInvoiceInfo(state => {
        console.log(updatedItem)
        state[info.label.toLowerCase()] = updatedItem.value
        return { ...state }
      })
    }
  }

  const generateInvoice = () => {
    // store the invoice
    // then render it
    if (invoiceInfo.seller === null || invoiceInfo.company === null) {
      return
    }
    let itemsGenerated = []
    items.forEach(ele => {
      if (ele.item !== null && ele.item.id && ele.quantity && ele.price )
        itemsGenerated.push({
          ...ele.item,
          quantity: ele.quantity,
          price: ele.price
        })
      
    //   ele.item !== null ? {
    //     id: ele.item.id,
    //     quantity: ele.quantity,
    //     price: ele.price
    //   } : null
    })
    if(itemsGenerated.length === 0) return
    
    console.log('new Invoice generated: ', invoiceInfo)
    const invoiceGenerated = {
      seller: invoiceInfo.seller.id,
      company: invoiceInfo.company.id,
      taxRate: invoiceInfo.taxRate,
      dateVal: invoiceInfo.dateVal,
      po: invoiceInfo.po,
      items: itemsGenerated.map(ele => {
        return {
          id: ele.id,
          quantity: ele.quantity,
          price: ele.price
        }
      }),
      withInfo: {
        seller:invoiceInfo.seller,
        company: invoiceInfo.company,
        items: itemsGenerated,
      }
    }
    invoiceGenerated.items = invoiceGenerated.items.filter(ele => ele !== null)
    if (invoiceGenerated.items.length === 0) {
      // TODO: tell them to enter an item
    } else {
      // if this is an edit, then we reuse id number
      if (edit) invoiceGenerated.id = invoiceId
      else invoiceGenerated.id = generateInvoiceNumber(invoices)
      // TODO: make sure that the invoice is then updated in our local store
      // if (edit) dispatch(editInvoice{...invoiceGenerated})
      dispatch(addInvoice({...invoiceGenerated}, invoices, edit))
      // dispatch(InvoiceActions.makeInvoice({ ...invoiceGenerated }))


      // props.history.push('')

      props.history.push('/invoice/view/' + invoiceGenerated.id.toString())
    }
  }

// console.log(inventory)
  let itemsToShow = items.map((ele, index) => {
    // console.log(ele)
    const eleId = ele.item ? ele.item.id+index : index

    const defaultValueDropDown = ele.item && inventory.length > 0 ? inventory.find(currItem => currItem.label === ele.item.description) : false
    // console.log(defaultValueDropDown, ele.item, inventory.length)
    return (
      <InvoiceItem
        defaultValue={defaultValueDropDown}
        defaultQuantity={ele.quantity}
        defaultPrice={ele.price}
        deleteItemHandler={removeItemHandler}
        options={inventory}
        itemNumber={index}
        valueUpdate={updateItem}
        info={ele}
        key={eleId}
      />
    )
  })

  return (
    <Container className='m-0 p-0'>
      <SecondaryNavBar
        back={'/invoice'}
        title={'Create Invoice'}
        // component1={editBtn}
        // component2={trashBtn}
      />

      <InvoiceInputSlot
        label='Company'
        defaultValue={edit && invoiceInfo.company !== null ? {label: invoiceInfo.company.name, value:invoiceInfo.company} : undefined}
        valueUpdate={updateItem}
        options={companies}
        type='dropdown'
      />
      <InvoiceInputSlot label='Seller' defaultValue={edit && invoiceInfo.seller !== null ? {label: invoiceInfo.seller.name, value:invoiceInfo.seller} : undefined} valueUpdate={updateItem} options={seller} type='dropdown' />

      <InvoiceInputSlot label='PO' defaultValue={edit ? invoiceInfo.po : undefined} valueUpdate={updateItem} type='text' />

      <Row className={` mt-3 d-flex justify-content-center`}>
        <Col xs={4} sm={2} md={2} lg={1} className={` col-1  pr-0 text-right`}>
          Date:
        </Col>
        <Col xs={8} sm={7} md={5} lg={4} className={` col-4 `}>
          <input
            type='date'
            value={invoiceInfo.dateVal}
            id='start'
            name='trip-start'
            onChange={(eve) => {
              //  console.log(eve.target.value)
              const { value } = eve.target
              // let newDate = Date.parse(value)
              // console.log(value)
              let newDate = new Date(value)
              setInvoiceInfo((a) => {
                return { ...a, date: newDate, dateVal: value }
              })
            }}
            min='2018-01-01'
          />
        </Col>
      </Row>
      <InvoiceInputSlot label='Tax Rate'  defaultValue={edit ? invoiceInfo.taxRate : undefined} valueUpdate={updateItem} type='number' />

      <div className={`  mt-3 `}>{itemsToShow}</div>

      <Row className={`mt-3 d-flex justify-content-center`}>
        <Col
          xs={7}
          sm={6}
          md={4}
          lg={3}
          onClick={addAnotherItem}
          className={`${style.addAnother} col-3 p-4 text-center`}>
          Add Another Item
        </Col>
      </Row>

      <Row className={`mt-3 d-flex justify-content-center`}>
        <Button click={generateInvoice} type='success'>
          {' '}
          Generate Invoice{' '}
        </Button>
      </Row>
    </Container>
  )
}

export default withRouter(MakeInvoice);