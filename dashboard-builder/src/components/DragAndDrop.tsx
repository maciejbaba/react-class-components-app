import { Component } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define the item type
type Item = {
  id: number;
  text: string;
};

type DragAndDropProps = object;
interface DragAndDropState {
  items: Item[];
}

const ItemType = "ITEM"; // Define item type for drag-and-drop

// DraggableItem Component
const DraggableItem = ({ id, text, index, moveItem }: { id: number; text: string; index: number; moveItem: (draggedId: number, droppedId: number) => void }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, index]);

  return (
    <div
      ref={drag}
      style={{
        padding: "16px",
        margin: "8px",
        backgroundColor: "#ddd",
        cursor: "move",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {text}
      <br />
      {id}
    </div>
  );
};

// DropZone Component to handle drops and reorder items
const DropZone = ({ children, moveItem }: { children: React.ReactNode, moveItem: (draggedId: number, droppedId: number) => void }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item: { id: number, index: number }) => {
      moveItem(item.id, item.index);
    },
  }), [moveItem]);

  return <div ref={drop}>{children}</div>;
};

// DragAndDrop Component
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
        <DropZone moveItem={this.handleDrop}>
          {items.map((item, index) => (
            <DraggableItem
              key={item.id}
              id={item.id}
              text={item.text}
              index={index}
              moveItem={this.handleDrop}
            />
          ))}
        </DropZone>
      </DndProvider>
    );
  }
}

export default DragAndDrop;
