import { Grid } from "@nextui-org/react";
import { IRocketListItem } from "../types/basic";
import styles from './RocketList.module.scss';
import RocketListItem from "./RocketListItem.component";

function RocketList(props: { rocketListData: Map<number, IRocketListItem> }) {

  const rocketList: Array<IRocketListItem> = Array.from(props.rocketListData.values());

  return (
    <Grid.Container justify="center" css={{gap:"20px"}}>
      {
        rocketList.length ? rocketList.map((rocketInfo: IRocketListItem) => {
          return <RocketListItem key={rocketInfo.id} rocketInfo={rocketInfo} />
        }) : <div>Nothing in memory yet!</div>
      }
    </Grid.Container>
  );
}

export default RocketList;