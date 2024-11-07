// src/components/Dashboard.js
import { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ClockWidget from "./ClockWidget";
import WeatherWidget from "./WeatherWidget";
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widgets: [
        { id: "1", title: "Clock", component: <ClockWidget /> },
        { id: "2", title: "Weather", component: <WeatherWidget /> },
      ],
    };
  }

  onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const widgets = Array.from(this.state.widgets);
    const [movedWidget] = widgets.splice(source.index, 1);
    widgets.splice(destination.index, 0, movedWidget);

    this.setState({ widgets });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <DashboardContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.state.widgets.map((widget, index) => (
                <Draggable
                  key={widget.id}
                  draggableId={widget.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        margin: "10px",
                      }}
                    >
                      {widget.component}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </DashboardContainer>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Dashboard;
