import React, { Component } from 'react';
import Error from './error';

export default class ErrorBoundary extends Component {
  state = {
    message: '',
  };

  static getDerivedStateFromError({ message } = {}) {
    return { message };
  }

  clearMessage = () => this.setState({ message: '' });

  render() {
    if (this.state.message) return <Error message={this.state.message} onConfirm={this.clearMessage} />;
    return this.props.children;
  }
}
