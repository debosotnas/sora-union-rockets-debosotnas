import { GlobalContext } from "@/contexts/globals.context";
import { IGlobalContextData, IPromptParams, PromptTypes } from "@/types/global";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { useContext, useState } from "react";

export default function Prompt() {

  const globalContext: IGlobalContextData = useContext(GlobalContext);
  const {
    open,
    title,
    msg,
    type,
    cbConfirm,
    cbCancel
  } = globalContext.showPromptInfo;

  const handleOk = () => {
    cbConfirm && cbConfirm();
    globalContext.showPrompt && globalContext.showPrompt({ open: false });
  }
  const handleCancel = () => {
    cbCancel && cbCancel();
    globalContext.showPrompt && globalContext.showPrompt({ open: false });
  }

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {type !== PromptTypes.INFO ?
          <Button onClick={handleCancel}>Cancel</Button> : null}
        <Button onClick={handleOk} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}