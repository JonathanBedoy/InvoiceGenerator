import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NoExpandTable from "../../components/Table/NoExpandTable/NoExpandTable";
import formatPhoneNumber from "../../functions/phoneFormatter";
import { getSellerInvoices } from "../../store/InvoiceFunctions/InvoiceFunctions";

const SellerTableView = (props) => {


  const [pending, setPending] = useState(true)
  const invoices = useSelector(state => state.invoice.invoices)
  const sellers = useSelector(state => state.seller.sellers)
  const hasBeenFetched = useSelector(state => state.seller.hasBeenFetched)
  const [sellerData, setSellerData] = useState(() => {
    return sellers.map(ele => {
      return {
        ...ele,
        invoicesMade: getSellerInvoices(invoices, ele.id)
      }
    })
  })

  useEffect(() => {
    // console.log(invoiceList)
    if (hasBeenFetched) {
      setPending(() => false)
    }
    setSellerData(() => {
      return sellers.map(ele => {
        return {
          ...ele,
          invoicesMade: getSellerInvoices(invoices, ele.id)
        }
      })
    })

  }, [sellers, invoices, hasBeenFetched])

  let columns = [
    {
      name: 'Seller',
      selector: row => row.name,
      sortable: true,
      cell: row => {
        // console.log(row)
        return (
          <Link to={`/seller/view/${row.id}`} target="" rel="">
            {row.name}
          </Link >
        )
      },
      center: true
    },
    {
      name: 'Phone',
      selector: row => {
        return formatPhoneNumber(row.phone)
      },
      sortable: true,
      center: true,
    },
    {
      name: 'Invoices Made',
      center: true,
      selector: row => row.invoicesMade.length,
      sortable: true
    }

  ];



  return (
    <Container className="m-0 p-0">
      <NoExpandTable pending={pending} columns={columns} data={sellerData} />
    </Container>
  )

}

export default SellerTableView;