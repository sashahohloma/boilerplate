import { Extensions, IEnv, IOptionalVariable } from 'env-var';

export type IConfig<TSchema extends Extensions = Extensions> = IEnv<IOptionalVariable<Extensions>, TSchema>;

export interface IConfigParams {
    path?: string;
}
