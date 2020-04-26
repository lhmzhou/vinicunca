

declare module 'iguazu' {
    import {ConnectAsyncHoC} from "./iguazu-types";
    export function connectAsync<T>(loaderFunction): ConnectAsyncHoC<T>
};