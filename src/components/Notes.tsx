import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNote, changeTitle, reorder, addNote } from "../actions";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {
  DragDropContext,
  Droppable,
  DropResult,
  DroppableProvided,
} from "react-beautiful-dnd";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import {
  StyledDroppableCol,
  StyledMainLi,
  StyledMainUl,
  StyledTitle,
  StyledCircle,
  Wrapper,
} from "./css/styledComponents/StyledNote";
import DraggableComponent from "./DraggableComponent";
import { IState } from "../reducers/reducerInterfaces";

const Notes: React.FC = () => {
  const newColumns = useSelector((state: IState) => state.columns);

  const dispatch = useDispatch();

  const selectColumnName = (name: string): string => {
    const selectedItem = Object.entries(newColumns).find(([key, data]) => {
      return key === name;
    }) as Array<any>;

    const newSelected = selectedItem[0];
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
        <StyledCircle />
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
                            <DraggableComponent
                              key={el.id}
                              el={el}
                              status={key}
                              index={index}
                              handleTitleInput={handleTitleInput}
                              handleNoteAreaInput={handleNoteAreaInput}
                            />
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
