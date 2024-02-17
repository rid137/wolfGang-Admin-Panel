// import React, { PureComponent } from 'react';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: 'Jan',
//     uv: 4000,
//     // pv: 2400,
//     // amt: 2400,
//   },
//   {
//     name: 'Mar',
//     uv: 3000,
//     // pv: 1398,
//     // amt: 2210,
//   },
//   {
//     name: 'May',
//     uv: 2000,
//     // pv: 9800,
//     // amt: 2290,
//   },
//   {
//     name: 'Jul',
//     uv: 2780,
//     // pv: 3908,
//     // amt: 2000,
//   },
//   {
//     name: 'Sep',
//     uv: 1890,
//     // pv: 4800,
//     // amt: 2181,
//   },
//   {
//     name: 'Nov',
//     uv: 2390,
//     // pv: 3800,
//     // amt: 2500,
//   },
  
// ];

// export default class Example extends PureComponent {

//   render() {
//     return (
//       <ResponsiveContainer width={330} height={300}>
//         <AreaChart
//           width={500}
//           height={400}
//           data={data}
//           margin={{
//             top: 10,
//             right: 30,
//             left: 0,
//             bottom: 0,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
//         </AreaChart>
//       </ResponsiveContainer>
//     );
//   }
// }

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Piechart = ({datas}: any) => {
  // console.log("datas", datas)
  
  const data = [
    { name: 'Jan', uv: 400},
    { name: 'Feb', uv: datas ? datas : 400 },
    { name: 'Mar', uv: 360 },
    { name: 'Apr', uv: 380 },
    { name: 'May', uv: 500 },
    { name: 'Jun', uv: 600 },
    { name: 'Jul', uv: 800 },
    { name: 'Aug', uv: 750 },
    { name: 'Sep', uv: 670 },
    { name: 'Oct', uv: 450 },
    { name: 'Nov', uv: 780 },
    { name: 'Dec', uv: 650 },
  ];


  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

