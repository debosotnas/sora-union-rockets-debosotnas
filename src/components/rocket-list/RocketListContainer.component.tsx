import { RocketContext } from "@/contexts/rockets.context";
import { useContext, useState } from "react";
import EditRocketForm from "../rocket-forms/EditRocketForm.component";
import { IRocketContextData, IRocketListItem } from "../../types/common";
import RocketList from "./RocketList.component";
import { Box, Dialog, DialogContent, Grid, Pagination, Paper, Typography } from "@mui/material";

function getEditRocketModal(
  { closeHandler,
    showEditRocketModal
  }: {
    closeHandler: () => void,
    showEditRocketModal: IRocketListItem | boolean
  }) {

  const showDialog: boolean = typeof showEditRocketModal === 'boolean' ? showEditRocketModal : true;
  return (
    <Dialog
      open={showDialog}
      onClose={closeHandler}
    >
      <DialogContent>
        <EditRocketForm rocketInfo={(showEditRocketModal as IRocketListItem) || {}} />
      </DialogContent>
    </Dialog>
  );
}

const CARDS_PER_PAGE: number = 6;

function RocketListContainer() {
  const rocketListContext: IRocketContextData = useContext(RocketContext);
  const [currPage, setCurrPage] = useState<number>(1);
  const closeHandler = () => {
    rocketListContext.setShowEditRocketModal && rocketListContext.setShowEditRocketModal(false);
  }

  const handlePageChange = (evt: React.ChangeEvent<unknown>, page: number) => {
    setCurrPage(page);
  }

  const countTotalPages = Math.ceil(rocketListContext.rocketListData.size / CARDS_PER_PAGE);
  const rocketListToShow: [number, IRocketListItem][] = Array.from(rocketListContext.rocketListData);
  const rocketListRange: [number, IRocketListItem][] = countTotalPages > 1 ?
    rocketListToShow.slice((currPage - 1) * CARDS_PER_PAGE, (currPage * CARDS_PER_PAGE)) :
    rocketListToShow;
  const currPageMap: Map<number, IRocketListItem> = new Map(rocketListRange);

  return (
    <Grid container spacing={16}>
      <Grid sx={{ width: 1 }} item>
        <Grid container justifyContent={{ xs: 'center', md: 'right' }} spacing={16}>
          <Grid sx={{ width: 1, maxWidth: 'md' }} item>
            <Paper className='paper-container-list' elevation={24}>
              <Typography variant="h4" component={"h3"} sx={{ textAlign: 'center' }}><b>🚀</b> List of Rockets</Typography>
              {rocketListContext.rocketListData.size > 0 && (
                <Typography
                  variant="h6" component={"p"}
                  sx={{ display: { md: 'none' }, color: 'purple', textAlign: 'center', fontSize: '.9rem', mb: 2 }}
                >[Click on cards to edit / Click on avatars to see more Github info]</Typography>
              )}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                minHeight: '490px'
              }}>
                <RocketList rocketListData={currPageMap} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  { countTotalPages > 1 && <Pagination count={
                    countTotalPages
                  } page={currPage} onChange={handlePageChange} /> }
                </Box>
              </Box>
              {getEditRocketModal({
                closeHandler,
                showEditRocketModal: rocketListContext.showEditRocketModal,
              })}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default RocketListContainer;