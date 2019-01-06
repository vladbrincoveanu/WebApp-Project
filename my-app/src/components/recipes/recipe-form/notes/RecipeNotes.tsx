import * as React from "react";
import "./recipe-notes.css";
import { Icon } from "@blueprintjs/core";
import Note from "./added-notes/Note";
import { RecipeViewModel } from "../../../../view-models/recipe";

interface State {
  notes: string[];
  currentNote: string;
}

interface Props {
  recipe: RecipeViewModel;
  handleNotesChange: Function;
}

const initialState = {
  notes: [],
  currentNote: ""
};

export class RecipeNotes extends React.Component<Props, State> {
  private noteInput: any;

  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.recipe.notes.length !== prevState.notes.length &&
      prevState.notes.length > 0
    ) {
      this.setState({ notes: [] });
    }

    if (this.props.recipe.id && prevProps.recipe !== this.props.recipe) {
      var notes: string[] = [];
      this.props.recipe.notes.map(data => {
        notes.push(data.noteContent);
      });
      this.setState({ ...this.state, notes: notes, currentNote: "" });
    }
  }

  private noteInputChanged(event: any): void {
    this.setState({ currentNote: event.target.value });
  }

  handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleAddNote();
      this.clearContent();
    }
  };

  private handleAddNote(): void {
    if (this.noteInput.value == "") return;
    var notes = this.state.notes;
    notes.push(this.state.currentNote);
    this.setState({ notes, currentNote: "" });

    this.clearContent();
    this.passData();
  }

  clearContent() {
    this.noteInput.value = "";
  }

  passData() {
    this.props.handleNotesChange(this.state.notes);
  }

  handleRemove(id: number) {
    var stateNotes = this.state.notes;
    stateNotes.splice(id, 1);
    this.setState({ notes: stateNotes });
    this.passData();
  }

  handleNoteValueUpdate(id: number, newValue: string) {
    for (let i = 0; i < this.state.notes.length; i++) {
      if (i === id) {
        this.state.notes[i] = newValue;
      }
    }
    this.setState({ notes: this.state.notes });
    this.passData();
  }

  render() {
    return (
      <div>
        <div className="bp3-form-group bp3-inline recipe-notes">
          <label className="bp3-label">Note</label>
          <textarea
            defaultValue=""
            ref={ref => {
              this.noteInput = ref;
            }}
            className="recipe-note"
            onChange={this.noteInputChanged.bind(this)}
            onKeyPress={this.handleKeyPress}
          />
          <Icon
            className="note-button"
            icon="plus"
            onClick={this.handleAddNote.bind(this)}
          />
        </div>
        {this.state.notes.map((item, key) => {
          return (
            <Note
              key={key}
              id={key}
              content={item}
              handleRemove={this.handleRemove.bind(this)}
              handleNoteValueUpdate={this.handleNoteValueUpdate.bind(this)}
            />
          );
        })}
      </div>
    );
  }
}
