// src/components/Widget.tsx
import { Component, ReactNode } from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin: 10px;
  background-color: ${(props) => props.theme.background};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

interface WidgetProps {
  title: string;
  children: ReactNode;
}

class Widget extends Component<WidgetProps> {
  render() {
    const { title, children } = this.props;
    return (
      <WidgetContainer>
        <h3>{title}</h3>
        {children}
      </WidgetContainer>
    );
  }
}

export default Widget;
