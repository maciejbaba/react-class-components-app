// src/components/DragAndDrop.tsx
import { Component } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type Item = {
  id: number;
  text: string;
};

type DragAndDropProps = object;
interface DragAndDropState {
  items: Item[];
}

class DragAndDrop extends Component<DragAndDropProps, DragAndDropState> {
  constructor(props: DragAndDropProps) {
    super(props);
    this.state = {
      items: [
        { id: 1, text: "Item 1" },
        { id: 2, text: "Item 2" },
        { id: 3, text: "Item 3" },
      ],
    };
  }

  handleDrop = (draggedId: number, droppedId: number) => {
    const { items } = this.state;
    const draggedIndex = items.findIndex((item) => item.id === draggedId);
    const droppedIndex = items.findIndex((item) => item.id === droppedId);
    const updatedItems = [...items];
    updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(droppedIndex, 0, items[draggedIndex]);
    this.setState({ items: updatedItems });
  };

  render() {
    const { items } = this.state;

    return (
      <DndProvider backend={HTML5Backend}>
        <div>
          {items.map((item) => (
            <DraggableItem key={item.id} id={item.id} text={item.text} />
          ))}
        </div>
      </DndProvider>
    );
  }
}

interface DraggableItemProps {
  id: number;
  text: string;
}

class DraggableItem extends Component<DraggableItemProps> {
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
        <br></br>
        {id}
      </div>
    );
  }
}

export default DragAndDrop;
