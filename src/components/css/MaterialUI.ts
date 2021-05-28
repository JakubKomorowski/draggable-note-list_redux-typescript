import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0),
      width: 200,
      borderRadius: 0,
    },
  },
  margin: {
    border: "none",
    width: 250,
  },
  input: {
    borderRadius: 0,
  },
}));

export const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `5px 5px 0 0px`,
        border: "1px solid #c2c2c2",
        borderBottom: "white",
      },
      "&.Mui-focused fieldset": {
        border: "1px solid #c2c2c2",
        borderBottom: "white",
      },
      "&:hover fieldset": {
        borderColor: "#c2c2c2",
        borderBottom: "white",
      },
    },
  },
})(TextField);

export const CssNoteField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid #c2c2c2",
        borderTop: "white",
        borderRadius: `0px 0 5px 5px`,
      },
      "&.Mui-focused fieldset": {
        border: "1px solid #c2c2c2",
        borderTop: "white",
      },
      "&:hover fieldset": {
        border: "1px solid #c2c2c2",
        borderTop: "white",
      },
    },
  },
})(TextField);
