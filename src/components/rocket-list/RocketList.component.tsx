import { IRocketListItem } from "../../types/common";
import styles from './RocketList.module.scss';
import RocketListItem from "./RocketListItem.component";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

function RocketList(props: { rocketListData: Map<number, IRocketListItem> }) {

  const rocketList: Array<IRocketListItem> = Array.from(props.rocketListData.values());

  return (
    <Grid container>
      <Grid item className={styles.rocketListContainer}>
        {
          rocketList.length ? rocketList.map((rocketInfo: IRocketListItem) => {
            return <RocketListItem key={rocketInfo.id} rocketInfo={rocketInfo} />
          }) : (
            <Grid>
              <Box sx={{my: 5}}>
                <Image
                  src='/static/images/nothing.svg'
                  alt='nothing yet'
                  width={300}
                  height={300}
                />
              </Box>
              <Typography>
                Nothing to see yet... add a new rocket!
              </Typography>
            </Grid>)
        }
      </Grid>
    </Grid>
  );

}

export default RocketList;