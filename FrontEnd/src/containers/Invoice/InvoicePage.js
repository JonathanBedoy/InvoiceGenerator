import React from 'react';
import { withRouter } from 'react-router-dom';
// import styles from './CompanyPage.module.css';
import AddButton from '../../components/UI/AddButton/AddButton';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
import InvoiceTable from './InvoiceTable/InvoiceTable';
import SecondaryNavBar from '../../components/UI/NavigationBar/SecondaryNavBar/SecondaryNavBar';

const InvoicePage = props => {

  let invoiceGenerator = () => {
    props.history.push('invoice/invoiceMaker')
  }

  return (
    <div>
      <SecondaryNavBar 
        title={'Invoice List'}
        component2={<AddButton click={invoiceGenerator} />}
      />
      {/* <Row>
        <Col
          sm={{ span: 2, offset: 9 }}
          xs={{ span: 2, offset: 9 }}
          lg={{ span: 2, offset: 9 }}
          md={{ span: 2, offset: 9 }}
          // className={styles.AddButton}
        >
          <AddButton click={invoiceGenerator} />
        </Col>
      </Row> */}
      <InvoiceTable />
    </div>
  );

}

export default withRouter(InvoicePage);