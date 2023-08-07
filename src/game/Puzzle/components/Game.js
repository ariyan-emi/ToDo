import React, { Component } from 'react'

export default class Game extends Component {
    findNextTile() {
        if(this.props.board.length) {
            let board = this.props.board;
            let nextVal = 1;
            while(nextVal<board.length) {
                if(board[nextVal-1]!==nextVal) break;
                nextVal++;
            }
            return nextVal;
        }
    }
    setTileStyle = (val, index, nextVal) => {
        let width = (100/this.props.size)-1;
        let textHeight = 'calc(40px + '+10/this.props.size+'vmin)';
        return({
            flexBasis: width+'%',
            paddingTop: (width/8)+'%',
            paddingBottom: (width/8*7)+'%',
            lineHeight: textHeight,
            fontSize: textHeight,
            backgroundColor: val === index+1 ?'green':(val===nextVal?'red':(val===0?'#6D28D9':'#EAB308'))
        })
    }
    generateTiles = () => {
        return (this.props.board.map( (val, index) => {
            return(
                <div className="tile" id={"tile"+val} key={val} style={this.setTileStyle(val, index, this.findNextTile())} onClick={this.props.move.bind(this, index)}> 
                {val?val:''}
                </div>
            );
        }))
    }
    render() {
        return (
            <div className="Game" ref="gameWindow">
                {this.generateTiles()}
            </div>
        )
    }
}