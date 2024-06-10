import React from "react";
import {
  SparklineComponent,
  Inject,
  SparklineTooltip,
} from "@syncfusion/ej2-react-charts";

class SparkLine extends React.PureComponent {
  render() {
    const { id, height, width, color, data, type, currentColor } = this.props;

    return (
      <SparklineComponent
        id={id}
        height={height}
        width={width}
        lineWidth={1}
        valueType="Category"
        fill={color}
        border={{ color: currentColor, width: 2 }}
        dataSource={data}
        xName="month"
        yName="total_revenue"
        type={type}
        tooltipSettings={{
          visible: true,
          format: "${month} : przychód ${total_revenue} zł",
          trackLineSettings: {
            visible: true,
          },
        }}
      >
        <Inject services={[SparklineTooltip]} />
      </SparklineComponent>
    );
  }
}

export default SparkLine;
