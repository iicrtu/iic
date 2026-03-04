import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h1>Something went wrong</h1>
          <p>Please try refreshing the page.</p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = '/';
            }}
            style={{
              marginTop: '1rem', padding: '0.5rem 1.5rem',
              fontSize: '1rem', cursor: 'pointer',
              borderRadius: '8px', border: '1px solid #ccc'
            }}
          >
            Go to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;