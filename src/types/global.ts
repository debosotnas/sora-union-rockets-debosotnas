export enum PromptTypes {
    INFO = 'INFO',
    OKCANCEL = 'OKCANCEL'
  }
  
export interface IPromptParams {
    open: boolean
    title?: string,
    msg?: string,
    type?: PromptTypes,
    cbConfirm?(): void,
    cbCancel?(): void,
  }

export interface IGlobalContextData {
  showPrompt?(promptInfo: IPromptParams): void;
  showPromptInfo: IPromptParams;
} 
