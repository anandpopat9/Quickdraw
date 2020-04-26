export default class MoveElementTool {
  findSelectedElement = (props, pos) => {
    const elements = Array.from(props.elements.values());
    for (let i = elements.length - 1; i >= 0; i--) {
      if (elements[i].isHit(pos)) {
        return elements[i];
      }
    }
  }

  handleMouseDown(props, pos) {
    this.selectedElement = this.findSelectedElement(props, pos);
    if (this.selectedElement) props.dragStart(pos);
  }

  handleMouseMove(props, pos) {
    const { dragFrom } = props.interaction;
    if (dragFrom) {
      const diffX = pos[0] - dragFrom[0];
      const diffY = pos[1] - dragFrom[1];
      props.moveElementAction({
          id: this.selectedElement.id,
          p1: [this.selectedElement.start[0] + diffX, this.selectedElement.start[1] + diffY],
          p2: [this.selectedElement.end[0] + diffX, this.selectedElement.end[1] + diffY],
          isTransient: true
      });
    }
  }

  handleMouseUp(props, pos) {
    const { dragFrom } = props.interaction;
    if (dragFrom) {
      props.dragFinish();
      const diffX = pos[0] - dragFrom[0];
      const diffY = pos[1] - dragFrom[1];
      props.moveElementAction({
          id: this.selectedElement.id,
          p1: [this.selectedElement.start[0] + diffX, this.selectedElement.start[1] + diffY],
          p2: [this.selectedElement.end[0] + diffX, this.selectedElement.end[1] + diffY],
      });
    }
    this.selectedElement = null;
  }
}