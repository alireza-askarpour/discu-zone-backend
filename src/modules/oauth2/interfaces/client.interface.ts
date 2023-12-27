export interface IClient {
  readonly id: string;
  readonly secret: string;
  readonly secretParamName?: string | undefined;
  readonly idParamName?: string | undefined;
}
