import { AddEditGithubUserProcess, IGithubUserDetails, IRocketContextData, IRocketListItem, UserActionProcess } from "@/types/common";
import { createContext, PropsWithChildren, useState } from "react";

const initGithubUserSelected:AddEditGithubUserProcess = new Map(
  [[UserActionProcess.ADD, null], [UserActionProcess.EDIT, null]]);

const rocketContextData: IRocketContextData = {
  isLoadingData: false,
  rocketListData: new Map(),
  showEditRocketModal: false,
  githubSuggestions: [],
  currGithubUserSelected: initGithubUserSelected,
}

export const RocketContext = createContext(rocketContextData);

export function RocketProvider({ children }: PropsWithChildren) {
  // used as main collection of cards/rockets
  const [rockets, setRockets] = useState<Map<number, IRocketListItem>>(new Map());
  // used to track current edition/add process
  const [currGithubUserSelected, 
      setCurrGithubUserSelected] = useState<AddEditGithubUserProcess>(initGithubUserSelected);
  // used to show card/rocket details
  const [showEditRocketModal, setShowEditRocketModal] = useState<IRocketListItem | boolean>(false);
  // used as collection of github users during autocomplete
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
        currGithubUserSelected,
        addOrUpdateRocket, // create / edit
        removeRocket,
        setShowEditRocketModal, // open-hide modal (rocketListItem/Container - Edit)
        setGithubSuggestions,
        setCurrGithubUserSelected,
      }}>
      {children}
    </RocketContext.Provider>
  );
}
