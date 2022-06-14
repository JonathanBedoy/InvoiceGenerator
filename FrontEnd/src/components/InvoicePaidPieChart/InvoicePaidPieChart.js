// This will get all the invoices that have not been paid (number of invoices)
// and compare it to the number of invoices that have been paid
import React from "react";
import { useSelector } from "react-redux";
import { VictoryPie, VictoryLabel } from "victory";
import { getInvoicehasPaidBreakdown } from "../../store/InvoiceFunctions/InvoiceFunctions";
import styles from "./InvoicePaidPieChart.module.css";

const InvoicePaidPieChart = (props) => {
  const invoices = useSelector((state) => state.invoice.invoices);
  // let data = [
  //   { x: "Paid", y: 40, color: "lightgreen" },
  //   { x: "Unpaid", y: 60, color: "#db6565" },
  // ];
  let data = getInvoicehasPaidBreakdown(invoices);

  return (
    <svg viewBox="0 0 400 400">
      <text textAnchor="middle" direction="inherit" dx="0" y="25" x="200">
        <tspan className={`${styles.title}`}>Invoice Statuses</tspan>
      </text>
      <VictoryPie
        colorScale={data.map((ele) => ele.color)}
        standalone={false}
        width={400}
        height={400}
        data={data}
        innerRadius={85}
        labelRadius={100}
        style={{ labels: { fontSize: 15, fill: "white", userSelect: "none" } }}
      />
      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 20, userSelect: "none" }}
        x={200}
        y={200}
        text="Invoices"
      />
      {data[1] ? (
        <rect
          y="70"
          x="25"
          width="15"
          height="15"
          className={`${styles.redLabel}`}
          style={{ fill: data[1].color }}
        />
      ) : (
        ""
      )}

      {data[1] ? (
        <text direction="inherit" dx="0" y="82.5" x="45">
          <tspan className={`${styles.label}`}>
            $
            {data[1].total
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </tspan>
        </text>
      ) : (
        ""
      )}

      {data[0] ? (
        <rect
          y="70"
          x="300"
          width="15"
          height="15"
          className={`${styles.greenLabel}`}
          style={{ fill: data[0].color }}
        />
      ) : (
        ""
      )}

      {data[0] ? (
        <text textAnchor="right" direction="inherit" dx="0" y="82.5" x="320">
          <tspan className={`${styles.label}`}>
            $
            {data[0].total
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </tspan>
        </text>
      ) : (
        ""
      )}
    </svg>
  );
};

export default InvoicePaidPieChart;
