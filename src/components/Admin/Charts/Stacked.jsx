import React from "react";
import {
  ChartComponent,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
  SeriesCollectionDirective,
} from "@syncfusion/ej2-react-charts";
import { stackedPrimaryXAxis } from "../data/dummy";
import { useStateContext } from "../../../contexts/ContextProvider";

function Stacked({ width, height, monthlyRevenueData, monthlyExpenseData }) {
  const { currentMode } = useStateContext();
  const maxRevenue = Math.max(
    ...monthlyRevenueData.map((month) => parseFloat(month.total_revenue || 0))
  );
  const maxExpense = Math.max(
    ...monthlyExpenseData.map((month) => parseFloat(month.total_expense || 0))
  );
  const maxY = maxExpense + maxRevenue;

  const stackedPrimaryYAxis = {
    lineStyle: { width: 0 },
    minimum: 0,
    maximum: maxY,
    interval: Math.ceil(maxY / 10000) * 1000,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: "{value}",
  };

  return (
    <ChartComponent
      width={width}
      height={height}
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      legendSettings={{ background: "white" }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
    >
      <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={monthlyRevenueData}
          xName="month"
          yName="total_revenue"
          type="StackingColumn"
          name="Przychody"
        />
        <SeriesDirective
          dataSource={monthlyExpenseData}
          xName="month"
          yName="total_expense"
          type="StackingColumn"
          name="Wydatki"
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}

export default Stacked;
