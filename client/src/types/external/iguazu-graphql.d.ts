declare module 'iguazu-graphql' {
    import {GraphFetchFunction, ReducerFunction, AddGraphQLEndpointsFunction} from "./iguazu-types";
    export function graphqlReducer(): ReducerFunction
    export function queryGraphQLData(queryDef): GraphFetchFunction
    export function mutateGraphQLData(mutationDef): GraphFetchFunction
    export function addGraphQLEndpoints(iguazuEndpoints): AddGraphQLEndpointsFunction
};