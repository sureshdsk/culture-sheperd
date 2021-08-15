import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';

const data = {
  labels: ['Sick', 'Sad', 'Happy', 'Neutral', 'Cant'],
  datasets: [
    {
      label: '# of Votes',
      data: [1, 2, 10, 1, 1],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        
      ],
      borderWidth: 1,
    },
  ],
};

// const data = [
//     {
//       name: 'Mon-1',
//       sick: 0,
//       sad: 1,
//       happy: 4,
//       neutral: 2,
//       cant: 1
//     },
//     {
//       name: 'Mon-2',
//       sick: 1,
//       sad: 0,
//       happy: 5,
//       neutral: 1,
//       cant: 2
//     },
//     {
//       name: 'Tue-1',
//       sick: 0,
//       sad: 0,
//       happy: 4,
//       neutral: 3,
//       cant: 0
//     },
//     {
//       name: 'Tue-2',
//       sick: 0,
//       sad: 4,
//       happy: 2,
//       neutral: 2,
//       cant: 0
//     },
    
//   ];
  
const bar_data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Red Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: '# of Blue Votes',
      data: [-12, 3, 20, 5, 1, 4],
      backgroundColor: 'rgb(54, 162, 235)',
    },
    {
      label: '# of Green Votes',
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: 'rgb(75, 192, 192)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

  

  export default function Home(){
    
    
      return (
        <>
          <div style={{width:"500px"}}>
            <Pie data={data} />
          </div>
          <div style={{width:"500px"}}>
            <Bar data={bar_data} options={options} />
          </div>
          
          
        </>
      );
    
  }
  
