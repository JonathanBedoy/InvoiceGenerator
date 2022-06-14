import React, { } from 'react';
import AddToInventory from '../AddToInventory/AddToInventory';
import Container from 'react-bootstrap/Container';
// import CompanyPage from './CompanyPage/CompanyPage'
// import styles from './Inventory.module.css';
import { withRouter, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SellerHub from './SellerHub';
import { addSeller } from '../../store/populateStore/populateStore';
import SellerView from './SellerView';
// import { CompanyActions } from '../../store/companiesSlice';
// import CompanyView from './CompanyPage/CompanyView';
// import { addCompany } from '../../store/populateStore/populateStore';


const Seller = (props) => {

  const dispatch = useDispatch()
  const attributesNeeded = useSelector(state => state.seller.attributesNeeded)
  const sellers = useSelector(state => state.seller.sellers)

  const addToSellers = (sellerToAdd) => {

    dispatch(addSeller(sellerToAdd, sellers))

    // dispatch(CompanyActions.addToCompany(company))
  }

  return (
    <Container className='m-0 p-0' fluid>
      <Route path='/seller' exact component={SellerHub} />
      <Route path='/seller/view/:id' exact component={SellerView} />
      <Route path='/seller/addSeller' exact
        render={(props) => (
          <AddToInventory title='Add Seller'
            btnClick={addToSellers}
            redirect={'/seller'}
            addButton='Add Seller'
            // itemsToInput={['Name', 'Location', 'Phone', 'Description']}
            attributesNeeded={attributesNeeded}
          />
        )}
      />
    </Container>
  );
}

export default withRouter(Seller);