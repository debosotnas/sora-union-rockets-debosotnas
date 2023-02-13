import { IRocketContextData, IRocketListItem } from '../types/basic';
import { Card, Text, Button, Grid } from '@nextui-org/react';
import styles from './RocketListItem.module.scss';
import { useContext } from 'react';
import { RocketContext } from '@/contexts/rockets.context';

// example img: 
// https://avatars.githubusercontent.com/u/57215976?v=4
// from NextUI
// https://nextui.org/images/card-example-6.jpeg

function ListItemLabel(k: string, v: string, className: string = '') {
  return <Grid>
    <Text className={className} as={'span'} ><b>{k}</b>: {v}</Text>
  </Grid>;
}

function RocketListItem({ rocketInfo }: { rocketInfo: IRocketListItem }) {
  const rocketListContext: IRocketContextData = useContext(RocketContext);
  const itemLableClass = [styles.listItemLabel, styles.listLineEllipsis1].join(' ');

  const onCardClickhandler = () => {
    // console.log('>> cardClickHandler - rocketInfo: ', rocketInfo);
    rocketListContext.setCurrEditRocketData && rocketListContext.setCurrEditRocketData(rocketInfo);
    rocketListContext.setShowEditRocketModal && rocketListContext.setShowEditRocketModal(true);
  };

  return (
    <div className={styles.rocketListItemWrapper}>
      <div className={styles.rocketCardImageWrapper}>
        <Card.Image
          className={styles.rocketCardImage}
          src="https://avatars.githubusercontent.com/u/57215976?v=4"
          objectFit="cover"
          width="100%"
          height="100%"
          alt=""
        />
      </div>
      <Card 
        isHoverable 
        isPressable
        variant="flat"
        onPress={() => {
          onCardClickhandler()
        }}
        className={styles.rocketListItem}>
        <Card.Body as={'div'}>
          <Grid.Container className={styles.rocketCard} as={'div'} key={rocketInfo.id}>
            {/* { ListItemLabel('ID', rocketInfo.id.toString(), itemLableClass) } */}
            {ListItemLabel('Title', rocketInfo.title, itemLableClass)}
            {ListItemLabel('Name', rocketInfo.name, itemLableClass)}
            {ListItemLabel('Description', rocketInfo.description, [styles.listItemLabel, styles.listLineEllipsis2].join(' '))}
            {ListItemLabel('Github', rocketInfo.githubUserInfo, [styles.listItemLabel, styles.listLineEllipsis2].join(' '))}
          </Grid.Container>

        </Card.Body>
      </Card>
    </div>
  )
}

export default RocketListItem;