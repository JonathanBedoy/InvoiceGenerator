import React from 'react';
import DataTable from 'react-data-table-component';
import ExpandableRows from './ExpandableRows/ExpandableRows'
import Loader from '../UI/Loader/Loader';
// import styles from './Table.module.css';

const table = (props) => {

  return (
    <div>
      <DataTable
        defaultSortField='name'
        highlightOnHover
        noTableHead
        noHeader
        columns={props.columns}
        data={props.data}
        progressPending={props.pending}
        progressComponent={<Loader />}
        expandableRows
        expandableRowDisabled={row => row.expandableInfo ? false : true}
        expandOnRowClicked
        expandableRowsComponent={
          <ExpandableRows
            clickBtn={props.clickBtn}
            titleExpandable="hello there"
            columnsExpandable={props.columns}
          />}
      />
    </div>

  )
}

export default table;