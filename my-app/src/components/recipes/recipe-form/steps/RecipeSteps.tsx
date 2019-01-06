import * as React from "react";
import "./recipe-steps.css";
import { Icon } from "@blueprintjs/core";
import Step from "./added-steps/Step";
import DragSortableList from "react-drag-sortable";
import { RecipeViewModel } from "../../../../view-models/recipe";
import { inject, observer } from "../../../../../node_modules/mobx-react";
import { StepViewModel } from "../../../../view-models/step";

interface State {
  steps: any[];
  list: any[];
  currentStep: string;
  errorMessage: string;
}

interface Props {
  handleStepChange: Function;
  handleStepsError: Function;
  recipe: RecipeViewModel;
}

const initialState = {
  steps: [],
  currentStep: "",
  errorMessage: "",
  list: []
};

@observer
@inject("recipesStore")
export class RecipeSteps extends React.Component<Props, State> {
  private stepInput: any;

  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate(prevProps, prevState: State) {
    if (
      this.props.recipe.steps.length !== prevState.steps.length &&
      prevState.steps.length > 0
    ) {
      this.setState({ steps: [] });
    }
    if (this.props.recipe.id && prevProps.recipe !== this.props.recipe) {
      let satateCpy: string[] = [];
      this.props.recipe.steps.map(da => {
        satateCpy.push(da.content);
      });
      this.setState({ ...this.state, steps: satateCpy });
    }
  }

  private handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleAddStep();
      this.clearContents();
    }
  };

  private handleAddStep(): void {
    if (this.state.currentStep == "") {
      this.stepInput.classList.replace("valid", "invalid");
      this.setState({ errorMessage: "Steps are required" });
      this.props.handleStepsError(true);
    } else {
      this.stepInput.classList.replace("invalid", "valid");
      this.setState({ errorMessage: "" });
      this.props.handleStepsError(false);

      var stateCpy = { ...this.state };
      stateCpy.steps.push(this.state.currentStep);
      this.setState({ steps: stateCpy.steps });
      this.passData();
      this.setState({ currentStep: "" });
    }

    this.clearContents();
  }

  clearContents() {
    this.stepInput.value = "";
  }

  handleChange(e: any) {
    this.setState({ currentStep: e.target.value });
  }

  handleStepValueUpdate(id: number, newValue: string) {
    for (let i = 0; i < this.state.steps.length; i++) {
      if (i === id) {
        this.state.steps[i] = newValue;
      }
    }
    this.setState({ steps: this.state.steps });
    this.passData();
  }

  handleRemove(id: number) {
    this.state.steps.splice(id, 1);
    this.passData();
  }

  onSort(sortedList: any[], event: Event) {
    let array: string[] = [];

    sortedList.map(element => {
      array.push(element.content.props.name);
    });

    this.setState({ steps: array });
    this.passData();
  }

  passData() {
    this.props.handleStepChange(this.state.steps);
  }

  errorMessage() {
    return this.state.errorMessage !== "" ? (
      <div className="error">
        <Icon icon="delete" />
        <span className="error-message">{this.state.errorMessage}</span>
      </div>
    ) : null;
  }

  render() {
    var list = this.state.steps.map((item, key) => ({
      content: (
        <Step
          key={key}
          id={key}
          name={item}
          handleRemove={this.handleRemove.bind(this)}
          handleStepValueUpdate={this.handleStepValueUpdate.bind(this)}
        />
      )
    }));

    return (
      <div>
        <div className="bp3-form-group bp3-inline recipe-steps">
          <label className="bp3-label">Steps*</label>
          <textarea
            defaultValue=""
            ref={ref => {
              this.stepInput = ref;
            }}
            className="recipe-step valid"
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress}
          />
          <Icon
            className="step-manage"
            icon="plus"
            onClick={this.handleAddStep.bind(this)}
          />
        </div>
        <DragSortableList
          items={list}
          onSort={this.onSort.bind(this)}
          dropBackTransitionDuration={0.3}
          type="vertical"
        />

        {this.errorMessage()}
      </div>
    );
  }
}
