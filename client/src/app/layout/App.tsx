 import { useEffect, useState } from 'react'
import { Activity } from '../models/activities';
import Narbar from './Narbar';
import { Button, Container } from 'semantic-ui-react';
import ActivityDasboard from '../../features/activities/dashboard/ActivityDasboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const { activityStore } =  useStore();

  const [activities , setActivities] = useState<Activity[]>([]);
  const [selectedActivity , setSelectActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    agent.Activities.list().then(res => {
      let activites : Activity[] = [];
      res.forEach(activity => {
        activity.date = activity.date.split('T')[0]
        activites.push(activity);
      })
      setActivities(activites);
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
    if(activity.id){
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x=> x.id !== activity.id), activity])
        setSelectActivity(activity);
        setEditMode(false);
      });
    }else{
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
      })
    }
  }

  function handleDeleteActivity (id : string){
    agent.Activities.delete(id).then(()=> {
      setActivities([
        ...activities.filter(x=> x.id !== id)
      ]);
    })
  }

  return (
    <>
      <Narbar openForm={handleFormOpen}/>
      <Container>

        <h1>{ activityStore.title }</h1>

        <Button onClick={activityStore.setTitle} content="add"/>

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

export default observer(App)
