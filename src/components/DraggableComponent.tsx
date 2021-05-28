import { IconButton } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import React, { ChangeEvent } from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { CssNoteField, CssTextField, useStyles } from "./css/MaterialUI";
import {
  IconWrapper,
  StyledNote,
  TrashWrapper,
} from "./css/styledComponents/StyledDraggableComponent";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CachedIcon from "@material-ui/icons/Cached";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { useDispatch } from "react-redux";
import { deleteNote } from "../actions";

interface IProps {
  el: any;
  status: string;
  index: any;
  handleNoteAreaInput: (
    id: number,
    name: string,
    e: ChangeEvent<{ value: unknown }>
  ) => void;
  handleTitleInput: (
    id: number,
    name: string,
    e: ChangeEvent<{ value: unknown }>
  ) => void;
}

const DraggableComponent: React.FC<IProps> = ({
  el,
  status,
  index,
  handleNoteAreaInput,
  handleTitleInput,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Draggable key={el.id} index={index} draggableId={el.id}>
      {(provided: DraggableProvided) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <StyledNote>
              <CssTextField
                className={classes.margin}
                id="outlined-multiline-static"
                placeholder="Title"
                variant="outlined"
                value={el.title}
                onChange={(e) => handleTitleInput(el.id, status, e)}
              />
              <CssNoteField
                className={classes.margin}
                id="outlined-multiline-static"
                // label="Multiline"
                placeholder="Note"
                multiline
                variant="outlined"
                value={el.noteArea}
                onChange={(e) => handleNoteAreaInput(el.id, status, e)}
              />
              <TrashWrapper>
                <Tooltip title="Delete Note">
                  <IconButton
                    onClick={() => dispatch(deleteNote(el.id, status))}
                  >
                    <DeleteOutlineIcon
                      aria-label="Delete Note"
                      style={{ fill: "gray" }}
                    />
                  </IconButton>
                </Tooltip>
              </TrashWrapper>
              <IconWrapper {...provided.dragHandleProps}>
                <Tooltip title="Grab Here">
                  {status === "Todo" ? (
                    <RadioButtonUncheckedIcon
                      aria-label="Grab Here"
                      style={{
                        fill: "gray",
                        fontSize: 18,
                      }}
                    />
                  ) : status === "In Progress" ? (
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
