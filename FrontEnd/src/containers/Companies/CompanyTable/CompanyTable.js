import React, { useEffect, useState } from "react";
// import Table from '../../../components/Table/Table';
import NoExpandTable from "../../../components/Table/NoExpandTable/NoExpandTable";
import { useDispatch, useSelector } from "react-redux";
import { CompanyActions } from "../../../store/companiesSlice";
import { Link } from "react-router-dom";
import formatPhoneNumber from "../../../functions/phoneFormatter";
const CompanyTable = (props) => {
  const [pending, setPending] = useState(true);
  const company = useSelector((state) => state.company);
  const dispatch = useDispatch(CompanyActions);
  const breakpoint = useSelector((state) => state.breakpoint);

  useEffect(() => {
    dispatch(CompanyActions.computeCompanyData());
  }, [company.company]); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    if (company.hasBeenFetched) {
      setPending(() => false);
    }
  }, [company.hasBeenFetched]);

  let columns = [
    {
      name: "Name",
      center: true,
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => {
        return (
          <Link to={`/companies/companyView/${row.id}`} target="" rel="">
            {row.name.length === 0 ? 'No Name' :row.name }
          </Link>
        );
      },
    },
    {
      name: "Phone",
      center: true,
      selector: (row) => formatPhoneNumber(row.phone),
      sortable: true,
    },
    // {
    //   name: 'Adress',
    //   selector: row => `${row.street} ${row.city} ${row.state} ${row.zipCode}`,
    //   sortable: true,
    // },
  ];
  if (!breakpoint.xs && !breakpoint.sm) {
    columns.push({
      name: "Adress",
      selector: (row) =>
        `${row.street} ${row.city} ${row.state} ${row.zipCode}`,
      sortable: true,
    });
  }

  return (
    <NoExpandTable pending={pending} columns={columns} data={company.company} />
  );
};

export default CompanyTable;
