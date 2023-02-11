import { IRocketListItem } from '../types/basic';
import { Card, Text, Button, Grid } from '@nextui-org/react';
import styles from './RocketListItem.module.scss';

// example img: 
// https://avatars.githubusercontent.com/u/57215976?v=4

function ListItemLabel({k, v}: {k: string, v: string}) {
    return <Grid>
        <Text as={'span'} >{k}</Text>: {v}
    </Grid>;
}

function RocketListItem({ rocketInfo }: { rocketInfo: IRocketListItem }) {
    return (
        <Card isHoverable variant="flat" css={{ $$cardColor: '#d5e3fb', maxW: '95%' }}>
            <Card.Body>
                <Grid.Container className={styles.rocketCard} key={rocketInfo.id}>
                    <Grid css={{w: '20%'}}>
                        Info
                    </Grid>
                    <Grid>
                        {ListItemLabel({k: 'ID', v: rocketInfo.id.toString()})}
                        {ListItemLabel({k: 'Title', v: rocketInfo.title})}
                        {ListItemLabel({k: 'Name', v: rocketInfo.name})}
                        {ListItemLabel({k: 'Description', v: rocketInfo.description})}
                        {ListItemLabel({k: 'Github User', v: rocketInfo.githubUserInfo})}
                    </Grid>
                </Grid.Container>
            </Card.Body>
        </Card>
    )
}

export default RocketListItem;