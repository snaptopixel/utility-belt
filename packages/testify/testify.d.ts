export interface IRequireApi {
  chai: Chai.ChaiStatic;
  addAlias(alias: string, actualPath: string): void;
}