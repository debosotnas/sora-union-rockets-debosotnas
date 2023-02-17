import Prompt from "@/components/globals/Prompt.component";
import { IGlobalContextData, IPromptParams } from "@/types/global";
import { createContext, PropsWithChildren, useState } from "react";

const globalContextData: IGlobalContextData = {
  showPromptInfo: {
    open: false
  }
};
export const GlobalContext = createContext(globalContextData);

export function GlobalsProvider({ children }: PropsWithChildren) {
  const [showPromptWithInfo, setShowPromptWithInfo] = useState<IPromptParams>({ open: false });

  const showPrompt = (promptInfoP : IPromptParams) => {
      setShowPromptWithInfo({...promptInfoP});
  }

  return (
    <>
      <GlobalContext.Provider value={{ showPrompt, showPromptInfo: showPromptWithInfo }}>
        <Prompt />
        {children}
      </GlobalContext.Provider>
    </>
  );
}