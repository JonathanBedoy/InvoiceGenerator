import React, { } from 'react';
import Container from 'react-bootstrap/Container';
// import styles from './Inventory.module.css';
import { withRouter, Route } from 'react-router-dom';

import MakeInvoice from './MakeInvoice/MakeInvoice';
import InvoiceView from './InvoiceView';
import InvoicePage from './InvoicePage';


const InvoiceHub = (props) => {


  return (
    <Container className={'m-0 p-0'} fluid>
      <Route path='/invoice' exact component={InvoicePage} />
      <Route path='/invoice/invoiceMaker' exact component={MakeInvoice} />
      <Route path='/invoice/view/:id' exact component={InvoiceView} />
      {/* <Route path='/companies/addcompany' exact
        render={(props) => (
          <AddToInventory title='Add Company'
            btnClick={addToCompanies}
            redirect={'/companies'}
            addButton='Add Company'
            itemsToInput={['Name', 'Location', 'Phone', 'Description']}
          />
        )}
      /> */}
    </Container>
  );
}

export default withRouter(InvoiceHub);