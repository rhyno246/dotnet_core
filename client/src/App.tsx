 import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  const [activities , setActivities] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/Activites')
    .then(res => {
      setActivities(res.data);
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div>
      <ul>
        { activities.map((activities : any) => (
          <li key={activities.id}>{ activities.title }</li>
        )) }
      </ul>
    </div>
  )
}

export default App
