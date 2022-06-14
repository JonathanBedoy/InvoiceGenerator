import React from 'react';
import AddToInventory from '../AddToInventory/AddToInventory';
import Container from 'react-bootstrap/Container';
import InventoryPage from './InventoryPage/InventoryPage'
// import styles from './Inventory.module.css';
import { withRouter, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addInventory } from '../../store/populateStore/populateStore';
import InventoryItemPage from './InventoryItem/InventoryItemPage';
import { generateInventoryDropdownCategories } from '../../store/InvoiceFunctions/InvoiceFunctions';


const Inventory = (props) => {

  const dispatch = useDispatch()
  const inventory = useSelector(state => state.inventory)
  const dropDownOptions = generateInventoryDropdownCategories(inventory.inventory, inventory.attributesNeeded)
  // const dispatch = useDispatch()
  // const tools = useSelector(state => state.tools)

  // const addInventory = () => {
  //   this.props.history.push('inventory/addinventory')
  // }

  const AddItemToInventory = (item) => {
    // dispatch(toolActions.addTool({newTool: (new Date()).getSeconds()}))
    dispatch(addInventory(item, inventory.inventory))
    // dispatch(InventoryActions.addToInventory(item))
  }

  return (
    <Container className='m-0 p-0' fluid>
      <Route path='/inventory' exact component={InventoryPage} />
      <Route path='/inventory/showItem/:id' exact component={InventoryItemPage} />
      <Route path='/inventory/addinventory' exact
        render={(props) => (
          <AddToInventory
            dropDownOptions={dropDownOptions}
            title='Add Item'
            btnClick={AddItemToInventory}
            redirect={'/inventory'}
            addButton='Add to Inventory'
            attributesNeeded={inventory.attributesNeeded}
          />
        )}
      />
    </Container>
  );
}

export default withRouter(Inventory);