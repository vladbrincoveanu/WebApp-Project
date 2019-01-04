export class QuantityType {
  id: number;
  name: string;

  constructor(qtype: any) {
    this.id = qtype.id;
    this.name = qtype.name;
  }
}
