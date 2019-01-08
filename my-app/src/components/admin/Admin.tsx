import * as React from "react";
import { Button } from "../../../node_modules/@blueprintjs/core";
import { inject } from "mobx-react";
import { UserStore } from "src/store/user-store";

interface Props {
  userStore: UserStore;
}

@inject("userStore")
export class Admin extends React.Component<Props, {}> {
  render() {
    return (
      <Button
        className="backColor"
        text={"Generate Ingredient Reports"}
        onClick={event => {
          // this.props.userStore.generatePdf();
          window.location.href =
            "https://localhost:44364/api/Reports/GenerateReportPdf";
        }}
      />
    );
  }
}
