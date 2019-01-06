import { observable } from "mobx";

export class StepViewModel {
  @observable
  public content: string;

  constructor(content: any) {
    this.content = content;
  }
}
