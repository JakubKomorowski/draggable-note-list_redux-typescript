import React, { ChangeEvent } from "react";
import { DefaultRootState, useDispatch, useSelector } from "react-redux";
import {
  changeNote,
  changeTitle,
  deleteNote,
  reorder,
  addNote,
} from "../actions";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CachedIcon from "@material-ui/icons/Cached";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "react-beautiful-dnd";
import { ContactSupportOutlined } from "@material-ui/icons";
// import CachedIcon from '@material-ui/icons/Cached';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { v4 as uuidv4 } from "uuid";
import { IState } from "../reducers/reducerInterfaces";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0),
      width: 200,
      borderRadius: 0,
    },
  },
  margin: {
    border: "none",
  },
  input: {
    borderRadius: 0,
  },
}));

const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `5px 5px 0 0px`,
        border: "1px solid #c2c2c2",
        borderBottom: "white",
        marginBottom: "-2px",
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

const CssNoteField = withStyles({
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

const StyledNote = styled.div`
  position: relative;
  width: 200px;
  margin-bottom: 20px;
`;

const TrashWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const IconWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  right: 15px;
`;

const StyledMainUl = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-around;
  list-style: none;
`;

const StyledMainLi = styled.li`
  width: 30%;
`;

const StyledDroppableCol = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid black;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 0 20px;
`;

interface IProps {
  el: any;
  key: any;
  index: any;
  newState: IState;
  // handleNoteAreaInput: (id: number, name: string, e: ChangeEvent<any>) => void;
  // handleTitleInput: (id: number, name: string, e: ChangeEvent<any>) => void;
}

const DraggableComponent: React.FC<IProps> = ({
  el,
  key,
  index,
  // handleTitleInput,
  // handleNoteAreaInput,
  newState,
}) => {
  // const newState = useSelector((state: IState) => state);

  const dispatch = useDispatch();
  const classes = useStyles();

  const selectColumnName = (name: string): any => {
    const selectedItem = Object.entries(newState).map(([key, data]) => {
      if (key === name) {
        return key;
      }
    });
    const newSelected = selectedItem.filter((el) => el != undefined);
    const selectedName = newSelected[0];
    // console.log(selectedName);
    return selectedName;
  };

  const handleTitleInput = (
    id: number,
    name: string,
    e: ChangeEvent<{ value: unknown }>
  ) => {
    const newTitle = e.target.value as string;

    dispatch(changeTitle(id, newTitle, selectColumnName(name)));
  };

  const handleNoteAreaInput = (
    id: number,
    name: string,
    e: ChangeEvent<{ value: unknown }>
  ) => {
    const newNoteArea = e.target.value as string;
    dispatch(changeNote(id, newNoteArea, selectColumnName(name)));
  };

  return (
    <Draggable key={el.id} index={index} draggableId={el.id}>
      {(provided) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <StyledNote>
              <CssTextField
                className={classes.margin}
                id="outlined-multiline-static"
                placeholder="Title"
                variant="outlined"
                value={el.title}
                onChange={(e) => handleTitleInput(el.id, key, e)}
              />
              <CssNoteField
                className={classes.margin}
                id="outlined-multiline-static"
                // label="Multiline"
                placeholder="Note"
                multiline
                variant="outlined"
                value={el.noteArea}
                onChange={(e) => handleNoteAreaInput(el.id, key, e)}
              />
              <TrashWrapper>
                <Tooltip title="Delete Note">
                  <IconButton onClick={() => dispatch(deleteNote(el.id, key))}>
                    <DeleteOutlineIcon
                      aria-label="Delete Note"
                      style={{ fill: "gray" }}
                    />
                  </IconButton>
                </Tooltip>
              </TrashWrapper>
              <IconWrapper {...provided.dragHandleProps}>
                <Tooltip title="Grab Here">
                  {key === "Todo" ? (
                    <RadioButtonUncheckedIcon
                      aria-label="Grab Here"
                      style={{
                        fill: "gray",
                        fontSize: 18,
                      }}
                    />
                  ) : key === "In Progress" ? (
                    <CachedIcon
                      aria-label="Grab Here"
                      style={{
                        fill: "gray",
                        fontSize: 20,
                      }}
                    />
                  ) : (
                    <CheckCircleOutlineIcon
                      aria-label="Grab Here"
                      style={{
                        fill: "gray",
                        fontSize: 20,
                      }}
                    />
                  )}
                </Tooltip>
              </IconWrapper>
            </StyledNote>
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableComponent;
