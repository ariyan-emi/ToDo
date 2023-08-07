import React, { Component } from 'react'

export default class ChangeSize extends Component {
    render() {
        return (
            <div className="ChangeSizeBox">
                <div className="ChangeSizeItem" onClick={() => this.props.onClick(3)}>3x3</div>
                <div className="ChangeSizeItem" onClick={() => this.props.onClick(4)}>4x4</div>
                <div className="ChangeSizeItem" onClick={() => this.props.onClick(5)}>5x5</div>
                <div className="ChangeSizeItem" onClick={() => this.props.onClick(6)}>6x6</div>
            </div>
        )
    }
}
