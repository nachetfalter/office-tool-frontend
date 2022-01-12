import { List, ListItem, IconButton } from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

interface Props {
  items: string[];
  onDragging: (sourceIndex: number, targetIndex: number) => void;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}

const CustomisedListItem = styled(ListItem)`
  border: 1px solid #d9d9d9;
  padding: 1em;
  border-radius: 5px;
  margin: 0.5em 0;
  justify-content: space-between;
  align-content: center;
  flex-direction: row;
`;

const CustomisedCloseIcon = styled(CloseIcon)`
  cursor: pointer;
`;

const DragAndDropList = ({ items, onDragging, onDelete }: Props): JSX.Element => {
  const draggingHandler = (result: DropResult, _: ResponderProvided) => {
    const sourceIndex = result.source?.index;
    const targetIndex = result.destination?.index;
    if (sourceIndex !== undefined && targetIndex !== undefined && sourceIndex !== targetIndex) {
      onDragging(sourceIndex, targetIndex);
    }
  };

  return (
    <DragDropContext onDragEnd={draggingHandler}>
      <Droppable droppableId="dnd-items">
        {(droppableProvided) => (
          <List ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} data-testid="drag-and-drop-list">
            {items.map((item, index) => (
              <Draggable draggableId={`files-${index}`} key={index} index={index}>
                {(draggableProvided) => (
                  <CustomisedListItem
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <span data-testid="item">{item}</span>
                    {onDelete && (
                      <IconButton
                        aria-label="delete item"
                        data-testid="delete-item"
                        onClick={(e) => onDelete(e, index)}
                      >
                        <CustomisedCloseIcon />
                      </IconButton>
                    )}
                  </CustomisedListItem>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDropList;
