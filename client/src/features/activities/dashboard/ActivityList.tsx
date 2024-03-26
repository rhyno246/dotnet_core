import { Activity } from "../../../app/models/activities";
import { Button, Item, Label, Segment } from "semantic-ui-react";
interface Props {
    activities : Activity[];
    selectActivity : (id : string) => void;
}
export default function ActivityList ({ activities , selectActivity } : Props) {
    return (
        <Segment>
            <Item.Group divided>
                { activities.map((activities) => (
                    <Item key={activities.id}>
                        <Item.Content>
                            <Item.Header as='a'>
                                { activities.title }
                            </Item.Header>
                            <Item.Meta>{ activities.date }</Item.Meta>
                            <Item.Description>
                                <div>{ activities.description }</div>
                                <div>{ activities.city } , { activities.venue }</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() =>selectActivity(activities.id)} floated="right" content="View" color="blue"/>
                                <Label basic content={activities.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )) }
            </Item.Group>
        </Segment>
    )
}