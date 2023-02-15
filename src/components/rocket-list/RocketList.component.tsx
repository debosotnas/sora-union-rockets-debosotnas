import { useContext, useState } from "react";
import { Grid } from "@nextui-org/react";
import { IRocketContextData, IRocketListItem } from "../types/common";
import styles from './RocketList.module.scss';
import RocketListItem from "./RocketListItem.component";
import { RocketContext } from "@/contexts/rockets.context";

function RocketList(props: { rocketListData: Map<number, IRocketListItem> }) {

  const rocketList: Array<IRocketListItem> = Array.from(props.rocketListData.values());

  return (
    <Grid.Container className={styles.rocketListContainer}>
      {
        rocketList.length ? rocketList.map((rocketInfo: IRocketListItem) => {
          return <RocketListItem key={rocketInfo.id} rocketInfo={rocketInfo} />
        }) : <Grid>Nothing in memory yet!</Grid>
      }
    </Grid.Container>
  );
}

export default RocketList;