import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';

import Canvas from './Canvas'
import PaletteItem from '../components/PaletteItem'

import { setTool, newDrawing, undo, redo } from '../actions'
import { Elements } from '../elements'

import deleteIcon from './img/delete.svg'
import undoIcon from './img/undo.svg'
import redoIcon from './img/redo.svg'
import lineIcon from './img/line.svg'
import moveIcon from './img/move.svg'
import rectIcon from './img/rect.svg'
import ellipseIcon from './img/ellipse.svg'
import newIcon from './img/new.svg'
import { saveCommandsRequest } from '../requests';

class App extends Component {
  actionButton({icon, name, action, enabled = true}) {
    return <PaletteItem enabled={enabled} icon={icon} name={name} tool={this.props.tool} clickAction={()=>{
      this.props.dispatch(action);
      setTimeout(() => saveCommandsRequest(this.props.commands), 500);
    }}/>
  }
  
  toolButton({icon, name, enabled = true}) {
    return this.actionButton({icon, name, action: setTool(name), enabled});
  }

  render() {
    const { isUndoEnabled, isRedoEnabled } = this.props;
    return (
      <div className="App">
        <header className="App-header">Quickdraw!</header>
        <div className="ui-container">
            <div className="palette">
              {this.actionButton({icon: undoIcon, name: 'Undo', enabled: isUndoEnabled, action: undo()})}
              {this.actionButton({icon: redoIcon, name: 'Redo', enabled: isRedoEnabled, action: redo()})}
              {this.actionButton({icon: newIcon, name: 'New', action: newDrawing()})}
              {this.toolButton({icon: deleteIcon, name: Elements.Delete})}
              {this.toolButton({icon: moveIcon, name: Elements.Move})}
              {this.toolButton({icon: lineIcon, name: Elements.Line})}
              {this.toolButton({icon: rectIcon, name: Elements.Rect})}
              {this.toolButton({icon: ellipseIcon, name: 'Ellipse', enabled: false})}
            </div>
            <Canvas/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tool: state.tool,
  isUndoEnabled: state.commands.do.length > 0, 
  isRedoEnabled: state.commands.redo.length > 0,
  commands: state.commands,
})

export default connect(mapStateToProps)(App);