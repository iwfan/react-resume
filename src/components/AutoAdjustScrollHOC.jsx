import React from 'react';

/**
 * 自动调整滚动条的高度
 */
export default WrappedComponent => {
  return class AutoAdjustScroll extends React.PureComponent {
    // ref = React.createRef()
    constructor(props) {
      super(props);
      this.ref = props.forwardRef;
    }
    componentDidMount() {
      this.adjustScrollPosition();
    }
    componentDidUpdate() {
      this.adjustScrollPosition();
    }
    adjustScrollPosition() {
      const { scrollHeight, scrollTop, clientHeight } = this.ref.current;
      if (scrollHeight > scrollTop + clientHeight) {
        this.ref.current.scrollTop = scrollHeight - clientHeight;
      }
    }
    render() {
      const { ref, ...resetProps } = this.props;
      return <WrappedComponent {...resetProps} forwardRef={this.ref} />;
    }
  };
};
