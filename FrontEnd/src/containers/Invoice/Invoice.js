import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Logo from "../../assets/logo.png";
// import Logo from "../../assets/JBLogo.png";
import style from "./Invoice.module.css";
import formatPhoneNumber from "../../functions/phoneFormatter";
import { getInvoiceWithId } from "../../store/InvoiceFunctions/InvoiceFunctions";
import { useSelector } from "react-redux";

const Invoice = (props) => {
  const state = useSelector((state) => state);
  const breakpoint = useSelector(state => state.breakpoint)
  const userLogo = useSelector((state) => state.user.invoiceLogo)

  // const [renderInvoice, setRenderInvoice] = useState(false)

  // let invoiceData = fetchAllInfoForInvoice(state, props.id)
  let invoiceData1 = getInvoiceWithId(props.id, state.invoice.invoices);
  let invoiceData = { doesNotExist: invoiceData1 ? false : true };
  if (!invoiceData.doesNotExist) {
    invoiceData = {
      companyInfo: invoiceData1.withInfo.company,
      po: invoiceData1.po,
      data: invoiceData1.withInfo.items,
      date: new Date(invoiceData1.date),
      hasPaid: invoiceData1.hasPaid,
      id: invoiceData1.id,
      seller: invoiceData1.withInfo.seller,
      taxRate: invoiceData1.taxRate,
      doesNotExist: false,
    };
  }

  // invoiceData = invoiceData ? { ...invoiceData, ...invoiceData.withInfo} : {...invoiceData, doesNotExist: true}


  const totalObj = {
    total: 0,
    subtotal: 0,
    taxed: 0,
    taxRate: invoiceData.taxRate,
  };

  let rows = [];

  if (!invoiceData.doesNotExist) {
    rows = invoiceData.data.map((ele, index) => {
      totalObj.subtotal += ele.price * ele.quantity;
      return (
        <Row className="m-0 p-0" key={index}>
          <Col className={style.typeColsInfo + " col-1 text-center "}>
            {ele.quantity}
          </Col>

          <Col className={style.typeColsInfo + " col-6 text-left"}>
            {ele.description}
          </Col>

          <Col className={style.typeColsInfo + " col-2 text-right"}>
            {parseFloat(ele.price)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Col>

          <Col className={style.typeColsInfo + " col-3 text-right"}>
            {(ele.price * ele.quantity)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Col>
        </Row>
      );
    });

    totalObj.taxed = +(totalObj.subtotal * (totalObj.taxRate / 100)).toFixed(2);
    totalObj.total = +(totalObj.taxed + totalObj.subtotal).toFixed(2);
  }

  //26 is the max number of items allowed in one invoice page

  return (
    <Container className={`${style.overFlowContainer} ${!breakpoint.xs && !breakpoint.sm && !breakpoint.md ? 'd-flex justify-content-center':''}`}>
      <div id="invoiceRender" className="my-5">
        {!invoiceData.doesNotExist ? (
          <div className={style.invoiceContainer + "  p-5"}>
            <Row>
              <Col>
                <img
                  src={userLogo ? userLogo : Logo}
                  height="75"
                  className=""
                  alt="On-Site Fasteners And Sons Logo"
                />
              </Col>
              {invoiceData.hasPaid ? (
                <Col className={`${style.paid}`}>PAID</Col>
              ) : (
                ""
              )}
              <Col className={style.invoiceText + " text-right"}>Invoice</Col>
            </Row>
            <Row>
              <Col className={style.adressHeader + " ml-3 pt-4"}>
                <p>{invoiceData.seller.street}</p>
                <p>
                  {invoiceData.seller.city}, {invoiceData.seller.state}{" "}
                  {invoiceData.seller.zipCode}
                </p>
                <p>{formatPhoneNumber(invoiceData.seller.phone)}</p>
                <p>{invoiceData.seller.email}</p>
              </Col>
            </Row>

            <Row>
              <Col className={style.soldToContainer + " mt-5"}>
                <Row>
                  <Col className={style.soldTo}>
                    <p>Sold To:</p>
                  </Col>
                </Row>
                <Row>
                  <Col className={style.soldToInfo}>
                    <p>{invoiceData.companyInfo.name}</p>
                    <p>{invoiceData.companyInfo.street}</p>
                    <p>
                      {invoiceData.companyInfo.city},{" "}
                      {invoiceData.companyInfo.state}{" "}
                      {invoiceData.companyInfo.zipCode}
                    </p>
                  </Col>
                </Row>
              </Col>

              <Col className={style.soldToContainer + " mt-5"}>
                <Row>
                  <Col className={style.soldTo}>
                    <p>Sold By:</p>
                  </Col>
                </Row>
                <Row>
                  <Col className={style.soldToInfo}>
                    <p>{invoiceData.seller.name}</p>
                    <p>{invoiceData.seller.street}</p>
                    <p>
                      {invoiceData.seller.city}, {invoiceData.seller.state}{" "}
                      {invoiceData.seller.zipCode}
                    </p>
                  </Col>
                </Row>
              </Col>

              <Col className={style.soldToContainer + " p-0 m-0 mt-5"}>
                <Row>
                  <Col className={style.soldTo + " text-right p-0 m-0"}>
                    <p>Invoice #</p>
                  </Col>
                  <Col className={style.invoiceInfo}>
                    <p>{invoiceData.id}</p>
                  </Col>
                </Row>
                <Row>
                  <Col className={style.soldTo + " text-right p-0 m-0"}>
                    <p>P.O. </p>
                  </Col>
                  <Col className={style.invoiceInfo}>
                    <p>
                      {invoiceData.po}
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col className={style.soldTo + " text-right p-0 m-0"}>
                    <p>Invoice Date</p>
                  </Col>
                  <Col className={style.invoiceInfo}>
                    <p>
                      {invoiceData.date.getUTCMonth() + 1}/
                      {invoiceData.date.getUTCDate()}/
                      {invoiceData.date.getUTCFullYear()}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className={style.table + " mt-4 p-0"}>
              {/* Descriptor ROW */}
              <Row className="m-0 p-0">
                <Col
                  className={
                    style.typeColsInfo +
                    " " +
                    style.typeCols +
                    " col-1 text-center p-1"
                  }>
                  QTY
                </Col>

                <Col
                  className={
                    style.typeColsInfo +
                    " " +
                    style.typeCols +
                    " col-6 text-center p-1"
                  }>
                  Description
                </Col>

                <Col
                  className={
                    style.typeColsInfo +
                    " " +
                    style.typeCols +
                    " col-2 text-center p-1"
                  }>
                  Unit Price
                </Col>

                <Col
                  className={
                    style.typeColsInfo +
                    " " +
                    style.typeCols +
                    " col-3 text-center p-1"
                  }>
                  Amount
                </Col>
              </Row>

              {rows}

              {/* END Descriptor ROW */}
              {/* NEW ROW */}
              {/* <Row className="m-0 p-0">
            <Col className={style.typeColsInfo + " col-1 text-center "}>
              2
            </Col>

            <Col className={style.typeColsInfo + " col-6 text-left"}>
              3/5' Senco
            </Col>

            <Col className={style.typeColsInfo + " col-2 text-right"}>
              40.00
            </Col>

            <Col className={style.typeColsInfo + " col-3 text-right"}>
              80.00
            </Col>
          </Row> */}
              {/* END NEW ROW */}

              {/* <Row className="m-0 p-0">
            <Col className={style.typeColsInfo + " col-1 text-center "}>
              25
            </Col>

            <Col className={style.typeColsInfo + " col-6 text-left"}>
              3/15' Senco N17
            </Col>

            <Col className={style.typeColsInfo + " col-2 text-right"}>
              215.30
            </Col>

            <Col className={style.typeColsInfo + " col-3 text-right"}>
              5,382.50
            </Col>
          </Row> */}
            </div>

            {/* Start TOTAL */}
            <Row className="m-0 p-0">
              <Col className="col-7"></Col>

              <Col className={style.totalInfo + " col-2 text-right"}>
                Subtotal
              </Col>

              <Col className={style.totalInfo + " col-3 text-right"}>
                {totalObj.subtotal
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Col>
            </Row>
            {parseInt(invoiceData.taxRate) === 0 ? (
              ``
            ) : (
              <Row className="m-0 p-0">
                <Col className="col-7"></Col>

                <Col className={style.totalInfo + " col-2 text-right"}>
                  Tax {totalObj.taxRate}%
                </Col>

                <Col className={style.totalInfo + " col-3 text-right"}>
                  {totalObj.taxed
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Col>
              </Row>
            )}

            <Row className="m-0 p-0">
              <Col className="col-7"></Col>

              <Col
                className={`col-2 text-right ${style.totalInfo} ${style.actualTotal}`}>
                TOTAL
              </Col>

              <Col
                className={
                  style.actualTotal +
                  ` ${style.actualTotalInfo} p-1 col-3 text-right`
                }>
                $
                {totalObj.total
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Col>
            </Row>

            {/* END TOTAL */}
          </div>
        ) : (
          ``
        )}
      </div>
    </Container>
  );
};

export default Invoice;
