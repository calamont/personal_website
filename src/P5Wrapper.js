import React from 'react'

class P5Wrapper extends React.Component {
  constructor({ sketch }) {
    super();
    this.myRef = React.createRef();
    this.sketch = sketch;
  }

  componentDidMount() {
    this.myP5 = new window.p5(this.sketch, this.myRef.current)
  }

  componentDidUpdate() {
    this.myP5.remove()
    this.myP5 = new window.p5(this.sketch, this.myRef.current)
  }

  componentWillUnmount() {
    this.myP5.remove()
  }
  render() {
    return (
      <div
        className="p5-wrapper-canvas"
        ref={this.myRef}
      />
    )
  }
}

export default P5Wrapper;
