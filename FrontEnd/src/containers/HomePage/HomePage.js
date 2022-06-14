import React from 'react';
import { Route } from 'react-router-dom';
import Navigationbar from '../../components/UI/NavigationBar/NavigationBar';
// import styles from './HomePage.modules.css';
// import InvoicePaidPieChart from '../../components/InvoicePaidPieChart/InvoicePaidPieChart';
import Inventory from '../Inventory/Inventory';
import Companies from '../Companies/Companies';
import Container from 'react-bootstrap/Container';
import InvoiceHub from '../Invoice/InvoiceHub';
// import SellerHub from '../Seller/SellerHub';
import Seller from '../Seller/Seller';
import HomePageStats from '../Statistics/HomePageStats';

const homePage = (props) => {

  return (
    <div>
      <header>
        <nav>
        <Navigationbar />
          {/* <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/companies'>Companies</Link></li>
            <li><Link to='/invoices'>Invoices</Link></li>
            <li><Link to='/inventory'>Inventory</Link></li>
          </ul> */}
        </nav>
      </header>
      <Container>
        <Route path='/' exact component={HomePageStats} />
        {/* <Route path='/pdf' exact component={MyDocument} /> */}
        <Route path='/inventory' component={Inventory} />
        <Route path='/companies' component={Companies} />
        <Route path='/invoice' component={InvoiceHub} />
        <Route path='/seller' component={Seller} />
        {/* <Route path='/about' exact component={InvoicePaidPieChart} /> */}
      </Container>
    </div>
  );
}

export default homePage;