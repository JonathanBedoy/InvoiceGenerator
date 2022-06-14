import React from 'react';
import { withRouter } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import styles from './InventoryPage.module.css';
// import InventoryTable from '../InventoryTable/InventoryTable'
import AddButton from '../../../components/UI/AddButton/AddButton';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
import SecondaryNavBar from '../../../components/UI/NavigationBar/SecondaryNavBar/SecondaryNavBar';
import InventoryNoExpandTable from '../InventoryTable/InventoryNoExpandTable/InventoryNoExpandTable';

const InventoryPage = props => {

  let addInventory = () => {
    props.history.push('inventory/addinventory')
  }

  // const tools = useSelector(state => state.tools)

  return (
    <div>
      <SecondaryNavBar
        title={'Inventory List'}
        component2={<AddButton click={() => addInventory()} />}
      />
      <InventoryNoExpandTable />
    </div>
  );

}

export default withRouter(InventoryPage);