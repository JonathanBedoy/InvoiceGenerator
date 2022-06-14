
import React, { useEffect, useState } from 'react';
// import Table from '../../../components/Table/Table';
import { getInvoicesList } from '../../../store/InvoiceFunctions/InvoiceFunctions';
import NoExpandTable from '../../../components/Table/NoExpandTable/NoExpandTable'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const InvoiceTable = props => {

  const [pending, setPending] = useState(true)
  const breakpoint = useSelector(state => state.breakpoint)
  const invoices = useSelector(state => state.invoice.invoices)
  const hasBeenFetched = useSelector(state => state.invoice.hasBeenFetched)
  const [invoiceList, setInvoiceList] = useState(getInvoicesList(invoices, props.id, props.attributeTypem, props.filterUnpaid))

  useEffect(() => {
    setInvoiceList(_state => getInvoicesList(invoices, props.id, props.attributeType, props.filterUnpaid))
  }, [invoices])// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // console.log(pending)
  }, [pending])


  useEffect(() => {
    if (hasBeenFetched) {
      setPending(() => false)
    }

  }, [hasBeenFetched])
  // const invoiceList = getCompanyInvoicesList(invoices, props.id)




  let columns = [
    {
      name: 'Invoice #',
      selector: row => row.name,
      sortable: false,
      cell: row => {
        return (
          <Link to={`/invoice/view/${row.id}`} target="" rel="">
            {row.id}
          </Link >
        )
      },
      center: true
    },
    {
      name: 'Total',
      selector: row => `$${(row.total.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      sortable: true,
      center: true,
    },
    {
      name: 'Paid',
      center: true,
      selector: row => {

        return row.hasPaid ? 'PAID' : 'Unpaid'
      },
      sortable: true,
      conditionalCellStyles: [
        {
          when: row => row.hasPaid,
          style: {
            backgroundColor: 'lightgreen'
          }
        },
        {
          when: row => !row.hasPaid,
          style: {
            backgroundColor: '#db6565'
          }
        }
      ],
    },
    {
      name: 'Date',
      center: true,
      selector: row => {
        const theDate = new Date(row.date)
        return `${theDate.getUTCMonth()}-${theDate.getUTCDate()}-${theDate.getUTCFullYear()}`
      },
      sortable: true,
    }

  ];
  if (breakpoint.xs || breakpoint.sm) {
    columns.splice(3, 1)
  }

  // let pending = true


  return (
    <NoExpandTable pending={pending} columns={columns} data={invoiceList} />
  );

}

export default InvoiceTable;