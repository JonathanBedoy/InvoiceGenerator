import React, { useEffect, useState } from "react";
// import Table from '../../../components/Table/Table';
import { useSelector } from "react-redux";
// import { Inven } from '../../../store/inventorySlice'
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import NoExpandTable from "../../../../components/Table/NoExpandTable/NoExpandTable";

const InventoryNoExpandTable = (props) => {
  const [pending, setPending] = useState(true);
  const inventory = useSelector((state) => state.inventory);
  const breakpoint = useSelector((state) => state.breakpoint);
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   // dispatch(CompanyActions.computeCompanyData())
  // }, [company.company])// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
  }, [pending]);

  useEffect(() => {
    if (inventory.hasBeenFetched) {
      setPending(() => false);
    }
  }, [inventory.hasBeenFetched]);

  let columns = [
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      center: true,
      cell: (row) => {
        return (
          <Link to={`/inventory/showItem/${row.id}`} target="" rel="">
            {row.description.length === 0 ? 'No Name' :row.description }
          </Link>
        );
      },
    },
    {
      name: "QTY",
      selector: (row) => row.quantity,
      sortable: true,
      center: true,
      conditionalCellStyles: [
        {
          when: (row) => row.quantity <= 0,
          style: {
            backgroundColor: "#db6565",
          },
        },
        {
          when: (row) => row.quantity > 0 && row.quantity < 3,
          style: {
            backgroundColor: "#ffc824",
          },
        },
      ],
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
      sortable: true,
      center: true,
    },
  ];
  if (!breakpoint.xs && !breakpoint.sm) {
    columns.push({
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      center: true,
    });
  }

  return (
    <NoExpandTable
      pending={pending}
      columns={columns}
      data={inventory.inventory}
    />
  );
};

export default withRouter(InventoryNoExpandTable);
