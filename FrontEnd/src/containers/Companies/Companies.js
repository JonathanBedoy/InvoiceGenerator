import React, { } from 'react';
import AddToInventory from '../AddToInventory/AddToInventory';
import Container from 'react-bootstrap/Container';
import CompanyPage from './CompanyPage/CompanyPage'
// import styles from './Inventory.module.css';
import { withRouter, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CompanyActions } from '../../store/companiesSlice';
import CompanyView from './CompanyPage/CompanyView';
import { addCompany } from '../../store/populateStore/populateStore';


const Companies = (props) => {

  const dispatch = useDispatch(CompanyActions)
  const attributesNeeded = useSelector(state => state.company.attributesNeeded)
  const companies = useSelector(state => state.company.company)

  const addToCompanies = (company) => {

    dispatch(addCompany(company, companies))

    // dispatch(CompanyActions.addToCompany(company))
  }

  return (
    <Container className='m-0 p-0' fluid>
      <Route path='/companies' exact component={CompanyPage} />
      <Route path='/companies/companyView/:id' exact component={CompanyView} />
      <Route path='/companies/addcompany' exact
        render={(props) => (
          <AddToInventory title='Add Company'
            btnClick={addToCompanies}
            redirect={'/companies'}
            addButton='Add Company'
            itemsToInput={['Name', 'Location', 'Phone', 'Description']}
            attributesNeeded={attributesNeeded}
          />
        )}
      />
    </Container>
  );
}

export default withRouter(Companies);