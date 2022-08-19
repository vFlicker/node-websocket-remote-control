export class Counter {
  private _count = 0;

  public get count(): number {
    return this._count;
  }

  public inc(): number {
    this._count++;
    return this.count;
  }

  public dec(): number {
    this._count--;
    return this.count;
  }
}
