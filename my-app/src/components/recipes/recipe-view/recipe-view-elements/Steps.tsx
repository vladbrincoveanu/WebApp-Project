import * as React from "react";
import "../recipe-view.css";
import { StepViewModel } from "../../../../view-models/step";

interface Props {
  steps: StepViewModel[];
  styleClass: string;
}

export class Steps extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.styleClass}>
        <h2>Instructions</h2>
        <div className="section-content">
          {this.props.steps.map((step, index) => {
            let stepNo = index + 1;
            return (
              <p className="left-align" key={index}>
                {stepNo + ". " + step.content}
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}
