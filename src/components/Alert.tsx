import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MaterialAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../reducers/reducerInterfaces";
import { closeAlert } from "../actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

const Alert: React.FC = () => {
  const classes = useStyles();

  const isOpen = useSelector((state: IState) => state.isAlertOpen);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <Collapse in={isOpen}>
        <MaterialAlert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                dispatch(closeAlert());
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          You already have one empty note!
        </MaterialAlert>
      </Collapse>
    </div>
  );
};

export default Alert;
