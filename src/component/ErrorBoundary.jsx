import React from "react";
import { ErrorBlock } from "antd-mobile";
import styled from "styled-components";
const StyleError = styled(ErrorBlock)`
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
`;
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  componentDidCatch(error, inof) {
    this.setState({ hasError: true });
    console.log(error.message);
    console.log(inof.componentStack);
  }
  render() {
    return this.state.hasError ? (
      <StyleError status="default" />
    ) : (
      this.props.children
    );
  }
}
export default ErrorBoundary;
