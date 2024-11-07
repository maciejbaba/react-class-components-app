// src/components/DragAndDrop.tsx
import { Component } from "react";
import { DndProvider, DragSource, DropTarget } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "ITEM";

interface DragAndDropProps {}
interface DragAndDropState {
  items: string[];
}

class DragAndDrop extends Component<DragAndDropProps, DragAndDropState> {
  constructor(props: DragAndDropProps) {
    super(props);
    this.state = {
      items: ["Item 1", "Item 2", "Item 3"],
    };
  }

  handleDrop = (draggedId: string, droppedId: string) => {
    const { items } = this.state;
    const draggedIndex = items.indexOf(draggedId);
    const droppedIndex = items.indexOf(droppedId);
    const updatedItems = [...items];
    updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(droppedIndex, 0, draggedId);
    this.setState({ items: updatedItems });
  };

  render() {
    const { items } = this.state;

    return (
      <DndProvider backend={HTML5Backend}>
        <div>
          {items.map((item, index) => (
            <DraggableItem key={index} id={item} text={item} />
          ))}
        </div>
      </DndProvider>
    );
  }
}

class DraggableItem extends Component<{ id: string; text: string }> {
  render() {
    const { id, text } = this.props;
    return (
      <div
        style={{
          padding: "16px",
          margin: "8px",
          backgroundColor: "#ddd",
          cursor: "move",
        }}
      >
        {text}
      </div>
    );
  }
}

export default DragAndDrop;
