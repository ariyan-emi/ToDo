import React, { Component } from 'react'

export default class Win extends Component {
    winStyle = () => {
        return {  display: this.props.win ? 'block' : 'none'}
    }
    render() {
        return (
            <div className="winBox" style={this.winStyle()}>
                <div className="win">
                    <b>You won!</b><br/>
                    Time: {this.props.time}<br/>
                    Moves: {this.props.moves}
                </div>
            </div>
        )
    }
}