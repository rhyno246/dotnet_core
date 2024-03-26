import { Grid} from "semantic-ui-react";
import { Activity } from "../../../app/models/activities";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities : Activity[];
    selectedActivity : Activity | undefined;
    selectActivity : (id : string) => void;
    cancelActivity : () => void;
    editMode : boolean;
    openForm : (id : string) => void;
    closeForm : () => void
}

export default function ActivityDasboard ({ 
    activities , selectedActivity , selectActivity , cancelActivity , editMode, openForm, closeForm 
} : Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} />
            </Grid.Column>
            <Grid.Column width='6'>
                {
                    selectedActivity && 
                    <ActivityDetails 
                        activity={selectedActivity} 
                        cancelActivity={cancelActivity}
                        openForm={openForm}
                    />
                }
                { editMode &&  <ActivityForm closeForm={closeForm} activity={selectedActivity}/> }
                
            </Grid.Column>
        </Grid>
    )
}