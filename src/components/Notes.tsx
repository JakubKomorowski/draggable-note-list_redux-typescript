import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeNote,
  changeTitle,
  deleteNote,
  reorder,
  addNote,
} from "../actions";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
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
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import DraggableComponent from "./DraggableComponent";
import { IState } from "../reducers/reducerInterfaces";
import { CssNoteField, CssTextField, useStyles } from "./css/MaterialUI";
import {
  IconWrapper,
  StyledDroppableCol,
  StyledMainLi,
  StyledMainUl,
  StyledNote,
  TrashWrapper,
  Wrapper,
  StyledTitle,
  StyledCircle,
} from "./css/styledComponents/StyledNote";

const Notes: React.FC = () => {
  const newColumns = useSelector((state: IState) => state.columns);

  const dispatch = useDispatch();
  const classes = useStyles();

  const selectColumnName = (name: string): string => {
    const selectedItem = Object.entries(newColumns).find(([key, data]) => {
      return key === name;
    }) as Array<any>;

    const newSelected = selectedItem[0];
    console.log(selectedItem);
    return newSelected;
  };

  const handleTitleInput = (
    id: number,
    name: string,
    e: ChangeEvent<{ value: unknown }>
  ): void => {
    const newTitle = e.target.value as string;

    dispatch(changeTitle(id, newTitle, selectColumnName(name)));
  };

  const handleNoteAreaInput = (
    id: number,
    name: string,
    e: ChangeEvent<{ value: unknown }>
  ): void => {
    const newNoteArea = e.target.value as string;

    dispatch(changeNote(id, newNoteArea, selectColumnName(name)));
  };

  const handleDragEnd = (result: DropResult): void => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    console.log(result);
    dispatch(
      reorder(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      )
    );
  };

  const handleAddNote = (name: string) => {
    const item = {
      id: uuidv4(),
      title: "",
      noteArea: "",
    };
    dispatch(addNote(item, selectColumnName(name)));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Wrapper>
        <StyledCircle></StyledCircle>
        <StyledMainUl>
          {Object.entries(newColumns).map(([key, data]) => {
            return (
              <StyledMainLi key={key}>
                <StyledTitle>{key}</StyledTitle>
                <Droppable droppableId={key}>
                  {(provided: DroppableProvided) => {
                    return (
                      <StyledDroppableCol
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {data.items.map((el: any, index: number) => {
                          return (
                            // <DraggableComponent
                            //   el={el}
                            //   index={index}
                            //   key={key}
                            //   newState={newState}
                            //   handleTitleInput={handleTitleInput}
                            //   handleNoteAreaInput={handleNoteAreaInput}
                            // />
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided: DraggableProvided) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <StyledNote>
                                      <CssTextField
                                        className={classes.margin}
                                        id="outlined-multiline-static"
                                        placeholder="Title"
                                        variant="outlined"
                                        value={el.title}
                                        onChange={(e) =>
                                          handleTitleInput(el.id, key, e)
                                        }
                                      />
                                      <CssNoteField
                                        className={classes.margin}
                                        id="outlined-multiline-static"
                                        // label="Multiline"
                                        placeholder="Note"
                                        multiline
                                        variant="outlined"
                                        value={el.noteArea}
                                        onChange={(e) =>
                                          handleNoteAreaInput(el.id, key, e)
                                        }
                                      />
                                      <TrashWrapper>
                                        <Tooltip title="Delete Note">
                                          <IconButton
                                            onClick={() =>
                                              dispatch(deleteNote(el.id, key))
                                            }
                                          >
                                            <DeleteOutlineIcon
                                              aria-label="Delete Note"
                                              style={{ fill: "gray" }}
                                            />
                                          </IconButton>
                                        </Tooltip>
                                      </TrashWrapper>
                                      <IconWrapper
                                        {...provided.dragHandleProps}
                                      >
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
                        })}
                        {provided.placeholder}

                        <div style={{ margin: "0 auto" }}>
                          <Tooltip title="Add Note">
                            <IconButton onClick={() => handleAddNote(key)}>
                              <AddIcon
                                aria-label="Add Note"
                                style={{ fill: "gray" }}
                              />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </StyledDroppableCol>
                    );
                  }}
                </Droppable>
              </StyledMainLi>
            );
          })}
        </StyledMainUl>
      </Wrapper>
    </DragDropContext>
  );
};

export default Notes;
