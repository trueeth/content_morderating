/**
 * Used to dentate functions that should be called when the specified events triggers
 * 
 * @member event DOM event to attach function calls to.
 * @member listeners array of functions to call when the event is triggered
 */
export interface IListeners {
    domEvent: string,
    listeners: Function[]
}