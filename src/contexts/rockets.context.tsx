import { IGithubUserDetails, IRocketContextData, IRocketListItem } from "@/components/types/common";
import { createContext, useState } from "react";

const rocketContextData: IRocketContextData = {
  isLoadingData: false,
  rocketListData: new Map(),
  showEditRocketModal: false,
  githubSuggestions: [],
}

export const RocketContext = createContext(rocketContextData);

export function RocketProvider({ children }: { children: any }) {
  const [rockets, setRockets] = useState<Map<number, IRocketListItem>>(new Map());
  const [showEditRocketModal, setShowEditRocketModal] = useState<IRocketListItem | boolean>(false);
  const [currEditRocketData, setCurrEditRocketData] = useState<IRocketListItem | null>(null);
  const [githubSuggestions, setGithubSuggestions] = useState<Array<IGithubUserDetails>>([]);

  const addOrUpdateRocket = (rocket:IRocketListItem) => {
    setRockets(new Map(rockets.set(rocket.id, rocket)));
  };

  const removeRocket = (rocket:IRocketListItem) => {
    const mapToUpdate:Map<number, IRocketListItem> = new Map(rockets);
    mapToUpdate.delete(rocket.id);
    setRockets(mapToUpdate);
  };

  console.log('>>> rockets: ', rockets);

  return (
    <RocketContext.Provider
      value={{ 
        isLoadingData: false,
        rocketListData: rockets,
        showEditRocketModal,
        // currEditRocketData,
        githubSuggestions,
        addOrUpdateRocket, // create / edit
        removeRocket, // not used
        setShowEditRocketModal, // open-hide modal (rocketListItem/Container - Edit)
        // setCurrEditRocketData,
        setGithubSuggestions,
      }}>
      {children}
    </RocketContext.Provider>
  );
}
