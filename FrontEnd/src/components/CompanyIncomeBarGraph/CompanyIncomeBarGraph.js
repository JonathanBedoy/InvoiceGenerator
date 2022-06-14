// get the top 5 companies that spend money
// and get the total money theyve spent(Future spent this month)

import React from "react";
import { useSelector } from "react-redux";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";
import { getTop5Companies } from "../../store/InvoiceFunctions/InvoiceFunctions";
import styles from "./CompanyIncomeBarGraph.module.css";

const CompanyIncomeBarGraph = (props) => {
  const storage = useSelector((state) => state);
  const data = getTop5Companies(
    storage.company.company,
    storage.invoice.invoices,
    3
  );
  // const data = [
  //   { x: "Artesian\nFurniture", y: 600.02, color: "lightblue", stroke: "blue" },
  //   { x: "Moss\nStudio", y: 350.9, color: "orange", stroke: "red" },
  //   { x: "Imperial\nManufacture", y: 535.54, color: "lightblue", stroke: "blue" },
  //   { x: "Creative\nSolutions", y: 1000.36, color: "lightgreen", stroke: "green" },
  //   { x: "Cresssative\nSolutions", y: 1000.36, color: "lightgreen", stroke: "green" },
  // ];
  return (
    <svg viewBox="0 0 400 400" style={{ userSelect: "none" }}>
      <text textAnchor="middle" direction="inherit" dx="0" y="25" x="200">
        <tspan className={`${styles.title}`}>Top 3 Companies</tspan>
      </text>
      <VictoryChart
        theme={VictoryTheme.material}
        style={{
          labels: {
            fontSize: 25,
          },
        }}
        standalone={false}
        width={400}
        height={400}
        domainPadding={55}>
        <VictoryBar
          sortKey="y"
          width={400}
          height={400}
          style={{
            data: {
              fill: ({ datum }) => datum.color,
              stroke: ({ datum, index }) => datum.stroke,
              fillOpacity: 0.7,
              strokeWidth: 3,
            },
            labels: {
              fontSize: 20,
              // fill: ({ datum }) => (datum.x === 3 ? "#000000" : "#c43a31"),
            },
          }}
          labels={({ datum }) =>
            `$${datum.y
              .toFixed(0)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
          }
          // style={{ data: { fill: "#c43a31" } }}
          data={data}
        />
      </VictoryChart>
    </svg>
  );
};
export default CompanyIncomeBarGraph;
