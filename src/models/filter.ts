export class Filter {
  public name?: string;
  public categoryId?: number;
  public productIds: number[];

  constructor() {
    this.productIds = [];
  }
}