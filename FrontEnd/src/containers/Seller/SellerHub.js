import React from 'react'
import { Container } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import AddButton from '../../components/UI/AddButton/AddButton'
import SecondaryNavBar from '../../components/UI/NavigationBar/SecondaryNavBar/SecondaryNavBar'
import SellerTableView from './SellerTableView'
const SellerHub = (props) => {

  let addToSeller = () => {
    props.history.push('/seller/addSeller')
  }

  return (
    <Container className='m-0 p-0'>

      <SecondaryNavBar 
        component2={<AddButton click={addToSeller} />}
        title={'Seller List'}
      />
      {/* <Row>
        <Col
          sm={{ span: 2, offset: 10 }}
          xs={{ span: 2, offset: 10 }}
          lg={{ span: 2, offset: 10 }}
          md={{ span: 2, offset: 10 }}
          className={'text-right'}
        >
          <AddButton click={addToSeller} />
        </Col>
      </Row> */}
      <SellerTableView />
    </Container>
  )
}

export default withRouter(SellerHub)