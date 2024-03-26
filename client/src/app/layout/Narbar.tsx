import { Button, Container, Menu } from 'semantic-ui-react';

export default function Narbar () {
    return (
        <Menu inverted>
            <Container>
                <Menu.Item name='Activities'/>
                <Menu.Item>
                    <Button positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
 }
