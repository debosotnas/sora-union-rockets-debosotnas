import { IGithubUserDetails, IRocketContextData, IRocketListItem } from "@/types/common";
import { createContext, PropsWithChildren, useState } from "react";

const rocketContextData: IRocketContextData = {
  isLoadingData: false,
  rocketListData: new Map(),
  showEditRocketModal: false,
  githubSuggestions: [],
}

export const RocketContext = createContext(rocketContextData);

export function RocketProvider({ children }: PropsWithChildren) {
  const [rockets, setRockets] = useState<Map<number, IRocketListItem>>(new Map());
  const [showEditRocketModal, setShowEditRocketModal] = useState<IRocketListItem | boolean>(false);
  const [githubSuggestions, setGithubSuggestions] = useState<Array<IGithubUserDetails>>([]);

  const addOrUpdateRocket = (rocket:IRocketListItem) => {
    setRockets(new Map(rockets.set(rocket.id, rocket)));
  };

  const removeRocket = (rocket:IRocketListItem) => {
    const mapToUpdate:Map<number, IRocketListItem> = new Map(rockets);
    mapToUpdate.delete(rocket.id);
    setRockets(mapToUpdate);
  };

  return (
    <RocketContext.Provider
      value={{ 
        isLoadingData: false,
        rocketListData: rockets,
        showEditRocketModal,
        githubSuggestions,
        addOrUpdateRocket, // create / edit
        removeRocket,
        setShowEditRocketModal, // open-hide modal (rocketListItem/Container - Edit)
        setGithubSuggestions,
      }}>
      {children}
    </RocketContext.Provider>
  );
}
