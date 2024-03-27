import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activities";
import { ChangeEvent, useState } from "react";

interface Props {
    closeForm : () => void;
    activity : Activity | undefined;
    createOrEdit:  (activity : Activity) => void;
}

export default function ActivityForm ({ activity , closeForm , createOrEdit } : Props) {

    const initalState = activity ?? {
        id : '',
        title : '',
        description : '',
        category : '',
        date : '',
        city : '',
        venue : ''
    }

    const [activites , setActivities] = useState(initalState);

    

    function handleInputChange (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivities({
            ...activites,
            [name] : value
        })
    }

    function handleSubmit  () {
        console.log(activites)
        createOrEdit(activites)
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' value={ activites?.title } name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' name='description' value={ activites?.description } onChange={handleInputChange}/>
                <Form.Input placeholder='Category' name='category' value={ activites?.category } onChange={handleInputChange}/>
                <Form.Input placeholder='Date'  name='date' value={ activites?.date } onChange={handleInputChange}/>
                <Form.Input placeholder='City'  name='city' value={ activites?.city } onChange={handleInputChange}/>
                <Form.Input placeholder='Venue'  name='venue' value={ activites?.venue } onChange={handleInputChange}/>
                <Button floated="right" positive type="submit" content='Submit'/>
                <Button onClick={closeForm} floated="right" type="button" content='Cancel'/>
            </Form>
        </Segment>
    )
}