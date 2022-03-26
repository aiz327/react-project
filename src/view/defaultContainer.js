import React from 'react';

export default class DefaultContainer extends React.Component {

  state = {
    info: {},
    stateName: 'super'
  }

  addName = () => {
    const { info } = this.state;
    info.name = 'zhang san'
    this.setState({
      info,
      stateName: 'superone'
    })
  }

  addAge = () => {
    const { info } = this.state;
    info.age = '18'
    this.setState({
      info
    })
  }

  render () {
    const { stateName } = this.state;
    return (
      <div>
        <div>this is default class container Component</div>
        <div>
          <button onClick={this.addName}>添加姓名</button>
          <button onClick={this.addAge}>添加年龄</button>
        </div>
        <div>component state name: {stateName}</div>
        <div>user info: {this.state.info?.name}{this.state.info?.age}</div>
      </div>
    )
  }
}