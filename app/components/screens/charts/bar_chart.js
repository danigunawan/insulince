import React from 'react';

import { View, Text } from 'react-native';

import {
  VictoryAxis, VictoryArea, VictoryChart, VictoryStack, VictoryTheme }
from "victory-native";


import PieChart from './pie_chart/pie_chart';


const data1992 = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

const data1993 = [
  {quarter: 1, earnings: 15000},
  {quarter: 2, earnings: 12500},
  {quarter: 3, earnings: 19500},
  {quarter: 4, earnings: 13000}
];

const data1994 = [
  {quarter: 1, earnings: 11500},
  {quarter: 2, earnings: 13250},
  {quarter: 3, earnings: 20000},
  {quarter: 4, earnings: 15500}
];

const data1995 = [
  {quarter: 1, earnings: 18000},
  {quarter: 2, earnings: 13250},
  {quarter: 3, earnings: 15000},
  {quarter: 4, earnings: 12000}
];


export default class BarChart extends React.Component {
  render() {
    return (
      <View>
        <Text>{"Victory Tutorial"}</Text>
        <PieChart />
        </View>
      //     <VictoryChart
      //   theme={VictoryTheme.material}
      // >
      //   <VictoryAxis
      //     tickValues={[1, 2, 3, 4]}
      //     tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
      //   />
      //   <VictoryAxis
      //     dependentAxis
      //     tickFormat={(x) => (`$${x / 1000}k`)}
      //   />
      //   <VictoryStack
      //     style={{
      //       data: { stroke: "white", strokeWidth: 4 }
      //     }}
      //     colorScale={["cyan", "gold", "orange", "tomato"]}
      //   >
      //     <VictoryArea
      //       style={{
      //         data: { fill: "navy" }
      //       }}
      //       data={data1992}
      //       x="quarter"
      //       y="earnings"
      //     />
      //     <VictoryArea
      //       data={data1993}
      //       x="quarter"
      //       y="earnings"
      //     />
      //     <VictoryArea
      //       data={data1994}
      //       x="quarter"
      //       y="earnings"
      //     />
      //     <VictoryArea
      //       data={data1995}
      //       x="quarter"
      //       y="earnings"
      //     />
      //   </VictoryStack>
      // </VictoryChart>
      // </View>
    );
  }
}
