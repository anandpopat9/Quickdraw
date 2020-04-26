export default class DeleteElementTool {

  findSelectedElement = (props, pos) => {
    const elements = Array.from(props.elements.values());
    for (let i = elements.length - 1; i >= 0; i--) {
      if (elements[i].isHit(pos))
        return elements[i];
    }
  }

  handleMouseDown(props, pos) {
    this.element = this.findSelectedElement(props, pos);
  }

  handleMouseMove(props, pos) {
    this.element = this.findSelectedElement(props, pos);
  }

  handleMouseUp(props) {
    if (this.element) props.deleteElementAction(this.element.id);
  }
}