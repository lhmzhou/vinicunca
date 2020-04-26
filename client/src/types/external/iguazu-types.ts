import {Store} from "redux";

// interface IguazuFetch {
//     (): { uri: string }
// }

type IguazuLoadArgs<T> = {
    store: Store,
    ownProps: T
}

// type IguazuEndpoint = {
//     uri: string,
//     fetch: IguazuFetch
// }

export interface BooleanFunction {
    (): boolean
}

export interface LoadDataAsPropsFunction<T> {
    (loaderProps: IguazuLoadArgs<T>): object
}


type ConnectAsyncOptions<T> = {
    loadDataAsProps: LoadDataAsPropsFunction<T>
}

interface Component {
    (props: object): object
}

interface HoC {
    (component: Component): object
}

export interface ConnectAsyncHoC<T> {
    (connectAsyncArgs: ConnectAsyncOptions<T>):  HoC
}

export interface AddGraphQLEndpointsFunction {
    (endpoints:[object]): void
}

export interface ReducerFunction {
    (state: object, action: object): object
}

export interface IguazuBasicResult {
    isLoading: BooleanFunction,
    lodedWithErrors: BooleanFunction
}

type QueryArgs = {
    endpointName: string,
    query: object,
    variables?: object
}

export interface GraphFetchFunction {
    (queryDef: QueryArgs): void
}