import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { InventoryActions } from '../../../store/inventorySlice'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const InventoryTable = props => {

  const inventory = useSelector(state => state.inventory)
  const dispatch = useDispatch(InventoryActions)
  const [inventoryData, setInventoryData] = useState([])


  useEffect(() => {
    dispatch(InventoryActions.copmuteInventoryData())
    // setInventoryData({...inventory.inventoryData})
    // let temp = inventory.inventoryData
    // // temp.expandableInfo.columns[0]['cell'] = <span>asdasdasd</span>
    // setInventoryData({...temp})
  }, [inventory.inventory])// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setInventoryData({ ...inventory.inventoryData })
    let temp = JSON.parse(JSON.stringify(inventory.inventoryData))
    temp = temp.map(ele => {
      let newEl = { ...ele }
      newEl.expandableInfo.columns[0].cell = row => {
        return (
          <Link to={`/inventory/showItem/${row.id}`} target="" rel="">
            {row.name}
          </Link >
        )
      }
      return newEl
    })
    // temp.expandableInfo.columns[0]['cell'] = <span>asdasdasd</span>
    setInventoryData(temp)

  }, [inventory.inventoryData])


  let columns = [
    {
      name: 'Inventory',
      selector: 'title',
      sortable: true,
    },
  ];
  let pending = false

  const goToItemView = (id) => {
    // props.history.push(`/inventory/showItem/${id}`)
  }
  return (
    <Table
      clickBtn={goToItemView}
      pending={pending}
      columns={columns}
      data={inventoryData}
    />
  );

}

export default withRouter(InventoryTable);