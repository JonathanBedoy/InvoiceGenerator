import React from 'react';
import { withRouter } from 'react-router-dom';
// import styles from './CompanyPage.module.css';
import CompanyTable from '../CompanyTable/CompanyTable'
import AddButton from '../../../components/UI/AddButton/AddButton';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
import SecondaryNavBar from '../../../components/UI/NavigationBar/SecondaryNavBar/SecondaryNavBar';

const CompanyPage = props => {

  let addToCompany = () => {
    // dispatch(addCompany({
    //   city: 'compton',
    //   street: 'imperial',
    //   zipCode: '987654',
    //   state: 'CO',
    //   phone: '1111111111',
    //   name: 'Joan Sebastian',
    //   description: 'Cool Ass Company'
    // }, companies))
    props.history.push('companies/addcompany')
  }

  return (
    <div>

      <SecondaryNavBar 
        component2={<AddButton click={addToCompany} />}
        title={'Company List'}
      />
      {/* <Row>
        <Col
          sm={{ span: 2, offset: 10 }}
          xs={{ span: 2, offset: 10 }}
          lg={{ span: 2, offset: 10 }}
          md={{ span: 2, offset: 10 }}
          className={'text-right'}
        >
          <AddButton click={addToCompany} />
        </Col>
      </Row> */}
      <CompanyTable />
    </div>
  );

}

export default withRouter(CompanyPage);