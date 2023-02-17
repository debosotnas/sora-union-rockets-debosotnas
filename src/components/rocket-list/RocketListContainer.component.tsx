import { RocketContext } from "@/contexts/rockets.context";
import { useContext } from "react";
import EditRocketForm from "../rocket-forms/EditRocketForm.component";
import { IRocketContextData, IRocketListItem } from "../../types/common";
import RocketList from "./RocketList.component";
import { Dialog, DialogContent, Grid, Paper, Typography } from "@mui/material";

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
function RocketListContainer() {

  const rocketListContext: IRocketContextData = useContext(RocketContext);
  const closeHandler = () => {
    rocketListContext.setShowEditRocketModal && rocketListContext.setShowEditRocketModal(false);
  }

  return (
    <Grid container spacing={16}>
      <Grid sx={{width: 1}} item>
        <Grid container justifyContent={{ xs: 'center', md: 'right' }} spacing={16}>
          <Grid sx={{width: 1, maxWidth: 'md'}} item>
            <Paper className='paper-container-list' elevation={24}>
              <Typography variant="h4" component={"h3"} sx={{textAlign: 'center'}}><i>🚀</i> List of Rockets</Typography>
              <RocketList rocketListData={rocketListContext.rocketListData} />
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