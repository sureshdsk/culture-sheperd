import styles from '../styles/Home.module.css'
import { Pie, Bar } from 'react-chartjs-2';

export default function Home() {
  const todayPie = {
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

  const yesterPie = {
    labels: ['Sick', 'Sad', 'Happy', 'Neutral', 'Cant'],
    datasets: [
      {
        label: '# of Votes',
        data: [3, 2, 5, 4, 1],
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

  const lastWeekData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: '# of Sick',
        data: [0, 1, 1, 2, 2, 1, 3],
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: '# of Sad',
        data: [2, 3, 0, 1, 1, 0],
        backgroundColor: 'rgb(54, 162, 235)',
      },
      {
        label: '# of Happy',
        data: [3, 10, 13, 15, 22, 30, 2],
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: '# of Neutral',
        data: [3, 2, 2, 1, 1, 1, 2],
        backgroundColor: 'rgb(45, 45, 80)',
      },
      {
        label: '# of Cant',
        data: [0, 0, 1, 1, 0, 0, 0],
        backgroundColor: 'rgb(80, 50, 192)',
      },
    ],
  };
  
  const lastWeekBarOptions = {
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
  

  return (
    <div className="page-l auto-center">
      <main>
      
      <div class="card " >
          <h2>Culture Sheperd's Dashboard</h2>
          
          <div className="flex flex-wrap" >
            <div className="flex-column" style={{width:'33.33%'}}>
                <div class="card fixed block">
                    <h2>Yesterday's Team Mood</h2>
                    <div style={{width:'auto'}}>
                      <Pie data={yesterPie} />
                    </div>
                    
                </div>
              </div>
            
            <div className="flex-column" style={{width:'33.33%'}}>
                <div class="card fixed block">
                <h2>Today's Team Mood</h2>
                  <div style={{width:'auto'}}>
                        <Pie data={todayPie} />
                  </div>
                </div>
            </div>
            <div className="flex-column" style={{width:'33.33%'}}>
                <div class="card fixed block" style={{height:'96%'}}>
                <h2>Last week Insights</h2>
                  <p>Last week 2 members were sad</p>
                  <p>Last week 10 members were happy</p>
                  <p>Last week 2 members were sick</p>
                  <p>Last week 2 members does not want to share their feeling</p>
                </div>
            </div>

            <div className="flex-column" style={{width:'100%'}}>
                <div class="card fixed block">
                <h2>Last Week's Mood</h2>
                <Bar data={lastWeekData} options={lastWeekBarOptions} />
                </div>
            </div>
          </div>
          
          
          
          
      </div>
       </main>
    </div>
  )
}
