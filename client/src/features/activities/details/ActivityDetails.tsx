import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Button
  } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activities';

interface Props {
    activity : Activity;
    cancelActivity : () => void;
    openForm  : (id : string) => void;

}

export default function ActivityDetails ({ activity, cancelActivity, openForm } : Props) {
    return (
        <Card style={{ width : "100%" }}>
            <CardContent>
                <CardHeader>{ activity.title }</CardHeader>
                <CardMeta>
                    <span className='date'>{ activity.date }</span>
                </CardMeta>
                <CardDescription>
                    { activity.description }
                </CardDescription>
                </CardContent>
            <CardContent extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit'/>
                    <Button onClick={cancelActivity} basic color='grey' content='Cancel'/>
                </Button.Group>
            </CardContent>
        </Card>
    )
}