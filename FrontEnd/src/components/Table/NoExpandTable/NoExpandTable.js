import DataTable from 'react-data-table-component';
import React from 'react';
import Loader from '../../UI/Loader/Loader'

function NoExpandTable(props) {

    return (
        <DataTable
            noHeader
            defaultSortField='name'
            highlightOnHover
            progressPending={props.pending}
            progressComponent={<Loader />}
            columns={props.columns}
            data={props.data}
        />
    );
};

export default NoExpandTable;