 import { useEffect, useState } from 'react'
import axios from 'axios';
import { Activity } from '../models/activities';
import Narbar from './Narbar';
import { Container } from 'semantic-ui-react';
import ActivityDasboard from '../../features/activities/dashboard/ActivityDasboard';
import { v4 as uuid } from 'uuid';

function App() {

  const [activities , setActivities] = useState<Activity[]>([]);
  const [selectedActivity , setSelectActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    axios.get<Activity[]>('http://localhost:3000/api/Activites')
    .then(res => {
      setActivities(res.data);
    }).catch(err => {
      console.log(err)
    })
  }, [])

  function handleSelectedActivity (id : string) {
    setSelectActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectedActivity () {
    setSelectActivity(undefined);
  }

  function handleFormOpen (id? : string){
    id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  } 

  function handleFormClose () {
    setEditMode(false);
  }

  function handleCreateOrEditActivity (activity : Activity) {
    activity.id ? setActivities([...activities.filter(x=> x.id !== activity.id), activity]) : setActivities([...activities, { ...activity, id : uuid() }]);
    setEditMode(false);
    setSelectActivity(activity);
  }

  function handleDeleteActivity (id : string){
    setActivities([
      ...activities.filter(x=> x.id !== id)
    ]);
  }

  return (
    <>
      <Narbar openForm={handleFormOpen}/>
      <Container>
        <ActivityDasboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openForm= {handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  )
}

export default App
