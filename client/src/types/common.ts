
interface InteractionFunction {
    (data: object):  void
}


export interface FormInteraction {
    onUpdate?: InteractionFunction
    onCreate?: InteractionFunction
    onDelete?: InteractionFunction
}



