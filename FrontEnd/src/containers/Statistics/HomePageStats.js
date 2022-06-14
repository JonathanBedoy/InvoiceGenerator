import React from "react";
import { Col, Row } from "react-bootstrap";
import CompanyIncomeBarGraph from "../../components/CompanyIncomeBarGraph/CompanyIncomeBarGraph";
import InvoicePaidPieChart from "../../components/InvoicePaidPieChart/InvoicePaidPieChart";
import SecondaryNavBar from "../../components/UI/NavigationBar/SecondaryNavBar/SecondaryNavBar";
// import styles from "./HomePageStats.module.css";
import InvoiceTable from "../Invoice/InvoiceTable/InvoiceTable";

const HomePageStats = (props) => {
  return (
    <div>
      <SecondaryNavBar title="Overview" />
      <Row className="d-flex justify-content-center">
        <Col xs={12} sm={6} md={6} lg={5} xl={4}>
          <InvoicePaidPieChart />
        </Col>
        <Col xs={12} sm={6} md={6} lg={5} xl={4}>
          <CompanyIncomeBarGraph />
        </Col>
      </Row>
      <Row>
        <Col xs={12} className={"pt-5"}>
          <h5 className="text-center">Unpaid Invoices</h5>
          <InvoiceTable filterUnpaid={true} />
        </Col>
      </Row>
    </div>
  );
};

export default HomePageStats;
