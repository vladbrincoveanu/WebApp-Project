import * as React from "react";
import { Icon } from "@blueprintjs/core";
import "../recipe-steps.css";

interface State {
  content: string;
}

interface Props {
  name: string;
  id: number;
  handleRemove: Function;
  handleStepValueUpdate: Function;
}

export default class Step extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { content: this.props.name };
  }

  handleDelete() {
    this.props.handleRemove(this.props.id);
  }

  handleChange(e: any) {
    this.setState({ content: e.target.value });
    this.props.handleStepValueUpdate(this.props.id, e.target.value);
  }

  render() {
    return (
      <div className="bp3-form-group bp3-inline recipe-steps">
        <textarea
          className="recipe-step added-step valid"
          onChange={this.handleChange.bind(this)}
          value={this.state.content}
        />
        <Icon icon="drag-handle-horizontal" className="drag-handle" />
        <Icon
          className="step-manage"
          icon="minus"
          onClick={this.handleDelete.bind(this)}
        />
      </div>
    );
  }
}
