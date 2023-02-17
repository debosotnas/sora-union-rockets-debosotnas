import { IRocketContextData, IRocketListItem } from '../../types/common';
import Image from 'next/image';
import styles from './RocketListItem.module.scss';
import { useContext } from 'react';
import { RocketContext } from '@/contexts/rockets.context';
import { Card, CardActionArea, CardContent, Grid, Box, IconButton, Typography, Avatar } from '@mui/material';
import { IGlobalContextData, PromptTypes } from '@/types/global';
import { GlobalContext } from '@/contexts/globals.context';

function ListItemLabel(k: (string), v: string, className: string = '') {
  return <Typography className={className}>{k ? <span><b>{k}</b> :</span> : '' }{v}</Typography>;
}

function RocketListItem({ rocketInfo }: { rocketInfo: IRocketListItem }) {
  const rocketListContext: IRocketContextData = useContext(RocketContext);
  const globalContext: IGlobalContextData = useContext(GlobalContext);

  const itemLableClass = [styles.listItemLabel, styles.listLineEllipsis1].join(' ');

  const onCardClickhandler = () => {
    rocketListContext.setShowEditRocketModal && rocketListContext.setShowEditRocketModal(rocketInfo);
  };

  const onDeleteClickHandler = () => {
    globalContext.showPrompt && globalContext.showPrompt(
      {
        open: true,
        title: 'Delete card',
        msg: 'Delete selected card?',
        type: PromptTypes.OKCANCEL,
        cbConfirm: () => {
          rocketListContext.removeRocket && rocketListContext.removeRocket(rocketInfo);
        }
      }
    );
  }

  const onShowGithubUserInfo = (ghid: string) => {
    console.log('>> ghid: ', ghid);
  }

  return (
    <Grid container sx={{width: .5}} className={styles.rocketListItemCmp}>
      <Grid item sx={{width: 1}} className={styles.rocketListItemContent}>
        <div className={styles.rocketListDeleteBtn}>
          <IconButton color='primary' aria-label='delete rocket' onClick={()=>{
            onDeleteClickHandler();
          }}>❌</IconButton>
        </div>

        <button onClick={() => onShowGithubUserInfo(rocketInfo.githubUserInfo)} className={styles.rocketCardImageWrapper}>
          <Avatar
            src="https://avatars.githubusercontent.com/u/57215976?v=4"
            className={styles.rocketCardImage}
            variant="square">
          </Avatar>          
        </button>

        <Card
          className={styles.rocketListItem}
          elevation={3}
          sx={{ width: 1, ':hover': { boxShadow: 14} }}
        >
          <CardActionArea onClick={onCardClickhandler}>
            <CardContent className={styles.rocketCard}>
              <Box>
                {ListItemLabel('Title', rocketInfo.title, itemLableClass)}
                {ListItemLabel('Name', rocketInfo.name, itemLableClass)}
                {ListItemLabel('Description', rocketInfo.description, [styles.listItemLabel, styles.listLineEllipsis2].join(' '))}
              </Box>
              <Box className={styles.githubUserLogin}>
                <Image src="/static/images/github-ico.svg" alt="github" width="18" height="18" />
                {ListItemLabel('', rocketInfo.githubUserInfo, [styles.listItemLabel, styles.listLineEllipsis2].join(' '))}
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>        
      </Grid>
    </Grid>
  )
}

export default RocketListItem;