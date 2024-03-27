import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    openForm : () => void;
}

export default function Narbar ({ openForm } : Props) {
    return (
        <Menu inverted>
            <Container>
                <Menu.Item name='Activities'/>
                <Menu.Item>
                    <Button onClick={openForm} positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
 }
