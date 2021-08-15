import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { Pie, Bar } from 'react-chartjs-2';
import { supabase } from '../client'
import { subDays, eachDayOfInterval, format } from 'date-fns';


export default function Home() {
  const [todayPie, setTodaysMood] = useState(null)
  const [yesterPie, setYestMood] = useState(null)
  const [weekPie, setWeekPie] = useState(null)
  const [lastWeekData, setLastWeekMood] = useState(null)
 
  let today = new Date();
    
  useEffect(() => {
    fetchTodaysMood()
    fetchYesterdaysMood()
    fetchLast7DaysMood()
    fetchLast30DaysMood()
  }, [])

  

  const fetchTodaysMood = async () => {
    let { error, data } = await supabase.from('mood_report').select().filter(
      'created_dt', 'eq', format(today, "yyyy-MM-dd")
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
      'created_dt', 'eq', format(subDays(today,1), "yyyy-MM-dd")
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

  const fetchLast7DaysMood = async () => {
    let filterDaysNum = 6;
    const aWeekFromNow = subDays(today, filterDaysNum);
    const thisWeek = eachDayOfInterval(
      { start: aWeekFromNow, end: today },
    );
    
    let thisWeekDays =[]
    for (let d of thisWeek){
      thisWeekDays.push(format(d, "yyyy-MM-dd"))
    }
    
   
    let { error, data } = await supabase.from('mood_report').select().in(
      'created_dt', thisWeekDays
    ).order('created_dt', {ascending:false})
    if (error) {
      console.log(error.message)
      return
    }
    const emptyArray = Array(filterDaysNum+1).fill(0);
    let WeekPieDataLabel = {sick: 0, sad: 1, happy:2, neutral: 3, cant_tell: 4}
    let WeekPieData = [0, 0, 0, 0, 0]
    for (let row of data){
      // console.log(row)
      WeekPieData[WeekPieDataLabel[row.mood]] += row.count;
    }
    // console.log(todayPieData)

    const _WeekPie = {
      labels: ['Sick', 'Sad', 'Happy', 'Neutral', 'Cant'],
      datasets: [
        {
          label: '# of Votes',
          data: WeekPieData,
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

    setWeekPie(_WeekPie)
  }

  const fetchLast30DaysMood = async () => {
    let filterDaysNum = 29;
    const aWeekFromNow = subDays(today, filterDaysNum);
    const thisWeek = eachDayOfInterval(
      { start: aWeekFromNow, end: today },
    );
    
    let thisWeekDays =[]
    for (let d of thisWeek){
      thisWeekDays.push(format(d, "yyyy-MM-dd"))
    }
    
    console.log(thisWeekDays);

    let { error, data } = await supabase.from('mood_report').select().in(
      'created_dt', thisWeekDays
    ).order('created_dt', {ascending:false})
    if (error) {
      console.log(error.message)
      return
    }
    const emptyArray = Array(filterDaysNum+1).fill(0);
    const dataWeek = {
      sick: [...emptyArray], 
      sad: [...emptyArray], 
      happy: [...emptyArray], 
      neutral: [...emptyArray],
      cant_tell: [...emptyArray]
    }
    
    for (let row of data){
      try {
        
        console.log("***********")
        console.log(row, thisWeekDays, thisWeekDays.indexOf(row.created_dt))
        console.log(dataWeek[row.mood])
        console.log(dataWeek[row.mood][thisWeekDays.indexOf(row.created_dt)])
        dataWeek[row.mood][thisWeekDays.indexOf(row.created_dt)] = dataWeek[row.mood][thisWeekDays.indexOf(row.created_dt)] + row.count;
        console.log(dataWeek[row.mood][thisWeekDays.indexOf(row.created_dt)])
        console.table(dataWeek)
      } catch (error) {
        console.error(error)
        console.error(row)
      }
      
    }
    

    const _lastWeekData = {
      labels: [...thisWeekDays],
      datasets: [
        {
          label: '# of Sick',
          type: 'line',
          data: dataWeek.sick,
          borderColor: 'rgb(255, 99, 132)',
        },
        {
          label: '# of Sad',
          type: 'line',
          data: dataWeek.sad,
          borderColor: 'rgb(54, 162, 235)',
        },
        {
          label: '# of Happy',
          type: 'line',
          data: dataWeek.happy,
          borderColor: 'rgb(75, 192, 192)',
        },
        {
          label: '# of Neutral',
          type: 'line',
          data: dataWeek.neutral,
          borderColor: 'rgb(45, 45, 80)',
        },
        {
          label: '# of Cant',
          type: 'line',
          data: dataWeek.cant_tell,
          borderColor: 'rgb(80, 50, 192)', //backgroundColor
        },
        // {
        //   type: 'line',
        //   label: 'Happy',
        //   borderColor: '#000',
        //   borderWidth: 2,
        //   fill: false,
        //   data: dataWeek.happy
        // },
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
                <div class="card fixed block" style={{height:'96%'}}>
                <h2>Last 7 Day's Team Mood</h2>
                  <div style={{width:'auto'}}>
                        <Pie data={weekPie} />
                  </div>
                </div>
            </div>
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
           

            <div className="flex-column" style={{width:'100%'}}>
                <div class="card fixed block">
                <h2>Last 30 Day's Mood</h2> 
                {/* <select onChange={(event)=> { changeFilterOption(event.target.value) }} value={filterOption}>
                  <option value="Last_7_Days">Last 7 Days</option>
                  <option value="Last_30_Days">Last 30 Days</option>
                </select> */}
                <Bar data={lastWeekData} options={lastWeekBarOptions} />
                </div>
            </div>
          </div>
          
          
          
          
      </div>
       </main>
    </div>
  )
}
