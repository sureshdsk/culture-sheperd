import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { Pie, Bar } from 'react-chartjs-2';
import { supabase } from '../client'

const zeroPad = (num, places) => String(num).padStart(places, '0')


export default function Home() {
  const [todayPie, setTodaysMood] = useState(null)
  const [yesterPie, setYestMood] = useState(null)
  const [lastWeekData, setLastWeekMood] = useState(null)
  
  

  let currentDate = new Date()
  let day = currentDate.getDate()
  let month = zeroPad(currentDate.getMonth() + 1, 2)
  let year = currentDate.getFullYear()

  let todayDate = `${year}-${month}-${day}`
  let yestDate = `${year}-${month}-${day-1}`
  let tomoDate = `${year}-${month}-${day+1}`

  useEffect(() => {
    fetchTodaysMood()
    fetchYesterdaysMood()
    fetchLastWeeksMood()
  }, [])

  const fetchTodaysMood = async () => {
    let { error, data } = await supabase.from('mood_report').select().filter(
      'created_dt', 'eq', todayDate
    )
    if (error) {
      console.log(error.message)
      return
    }
    console.table(data);
    let todayPieDataLabel = {sick: 0, sad: 1, happy:2, neutral: 3, cant_tell: 4}
    let todayPieData = [0, 0, 0, 0, 0]
    for (let row of data){
      // console.log(row)
      todayPieData[todayPieDataLabel[row.mood]] += row.count;
    }
    // console.log(todayPieData)

    const _todayPie = {
      labels: ['Sick', 'Sad', 'Happy', 'Neutral', 'Cant'],
      datasets: [
        {
          label: '# of Votes',
          data: todayPieData,
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

    setTodaysMood(_todayPie)
  }

  const fetchYesterdaysMood = async () => {
    let { error, data } = await supabase.from('mood_report').select().filter(
      'created_dt', 'eq', yestDate
    )
    if (error) {
      console.log(error.message)
      return
    }
    console.table(data);
    let yestPieDataLabel = {sick: 0, sad: 1, happy:2, neutral: 3, cant_tell: 4}
    let yestPieData = [0, 0, 0, 0, 0]
    for (let row of data){
      // console.log(row)
      yestPieData[yestPieDataLabel[row.mood]] += row.count;
    }
    // console.log(yestPieData)
    const _yestPie = {
      labels: ['Sick', 'Sad', 'Happy', 'Neutral', 'Cant'],
      datasets: [
        {
          label: '# of Votes',
          data: yestPieData,
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

    setYestMood(_yestPie)
  }

  const fetchLastWeeksMood = async () => {
    const last7dates = [...Array(7)].map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - i)

      let day = zeroPad(d.getDate(), 2)
      let month = zeroPad(d.getMonth() + 1, 2)
      let year = d.getFullYear()
      return `${year}-${month}-${day}`
  })
  const last7days = last7dates.reverse()

    let { error, data } = await supabase.from('mood_report').select().in(
      'created_dt', last7days
    ).order('created_dt', {ascending:false})
    if (error) {
      console.log(error.message)
      return
    }
    console.log('last7dates')
    console.table(data);

    let dataWeek = {sick: [0, 0, 0, 0, 0, 0, 0], 
      sad: [0, 0, 0, 0, 0, 0, 0], 
      happy:[0, 0, 0, 0, 0, 0, 0], 
      neutral: [0, 0, 0, 0, 0, 0, 0],
       cant_tell: [0, 0, 0, 0, 0, 0, 0]}
    
    for (let row of data){
      try {
        console.log(row, last7days.indexOf(row.created_dt))
        dataWeek[row.mood][last7days.indexOf(row.created_dt)] += row.count;
      } catch (error) {
        console.error(error)
        console.error(row)
      }
      
    }
    console.table(dataWeek)

    const _lastWeekData = {
      labels: [...last7days],
      datasets: [
        {
          label: '# of Sick',
          data: dataWeek.sick,
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: '# of Sad',
          data: dataWeek.sad,
          backgroundColor: 'rgb(54, 162, 235)',
        },
        {
          label: '# of Happy',
          data: dataWeek.happy,
          backgroundColor: 'rgb(75, 192, 192)',
        },
        {
          label: '# of Neutral',
          data: dataWeek.neutral,
          backgroundColor: 'rgb(45, 45, 80)',
        },
        {
          label: '# of Cant',
          data: dataWeek.cant_tell,
          backgroundColor: 'rgb(80, 50, 192)',
        },
      ],
    };

    setLastWeekMood(_lastWeekData)
  }

  

  
  
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
