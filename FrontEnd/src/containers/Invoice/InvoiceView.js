import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { renderPdf } from "../PDF/pdfGenerator";
import Button from "../../components/UI/Button/Button";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { InvoiceActions } from "../../store/invoiceSlice";
import { removeSomethingsOnDbWithID, updateInvoiceStatus } from "../../store/populateStore/populateStore";
import SecondaryNavBar from '../../components/UI/NavigationBar/SecondaryNavBar/SecondaryNavBar'
import TrashButton from "../../components/UI/TrashButton/TrashButton";
import DownloadButton from "../../components/UI/DownloadButton/DownloadButton";
import Invoice from "./Invoice";
import EditButton from "../../components/UI/EditButton/EditButton";
import MoneyButton from "../../components/UI/MoneyButton/MoneyButton";

const InvoiceView = (props) => {

  const id = props.match.params.id
  const dispatch = useDispatch()

  const markPaidHandler = (hasPaid) => {
    dispatch(updateInvoiceStatus( hasPaid, id))
  }



  const invoiceData = useSelector((state) => state.invoice.invoices.find(ele => parseInt(ele.id) === parseInt(id)))
  
  const markPaidToggleHandler = () => {
    dispatch(updateInvoiceStatus( !invoiceData.hasPaid, id))
  }
  const deleteInvoiceHandler = () => {
    dispatch(removeSomethingsOnDbWithID({attributeLabel: 'id', attributeValue: id, attributeValueType:'number'}, 'invoice'))
    // dispatch(InvoiceActions.removeInvoice({id}))
    // console.log(props.history)
    props.history.push('/invoice')
  }
  // TODO: add hasPaid 
  const hasPaidBtn = <MoneyButton status={invoiceData ? invoiceData.hasPaid : false} btnClick={() => markPaidToggleHandler()} />
  const editBtn = <EditButton btnClick={() => props.history.push('/invoice/edit/' + id)} />
  const trashBtn = <TrashButton btnClick={deleteInvoiceHandler} caution={true} cautionText={'This will PERMANENTLY REMOVE the invoice!'} />
  const DownloadBtn = <DownloadButton btnClick={() => renderPdf()} />

  return (
    <Container className="m-0 p-0">
      <SecondaryNavBar 
        back={'/invoice'}
        component1={hasPaidBtn}
        component2={editBtn}
        component3={trashBtn}
        component4={DownloadBtn}
        title='Invoice'
      />
      {/* <Row>
        <Col className="d-flex justify-content-center">
          <Button className={'mr-4'} type='success' click={() => markPaidHandler(true)}>Mark as Paid</Button>
          <Button className={'mr-4'} type='primary' click={() => markPaidHandler(false)}>Mark as unPaid</Button>
        </Col>
      </Row> */}

      <Invoice id={props.match.params.id} />

      {/* <PdfGenerator /> */}
    </Container>
  )
}

export default withRouter(InvoiceView)