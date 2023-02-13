import { IRocketContextData, IRocketListItem } from "@/components/types/basic";
import { createContext, useState } from "react";

const rocketContextData: IRocketContextData = {
  isLoadingData: false,
  rocketListData: new Map(),
  showEditRocketModal: false,
  currEditRocketData: null,
}

export const RocketContext = createContext(rocketContextData);

export function RocketProvider({ children }: { children: any }) {
  const [rockets, setRockets] = useState<Map<number, IRocketListItem>>(new Map());
  const [showEditRocketModal, setShowEditRocketModal] = useState<boolean>(false);
  const [currEditRocketData, setCurrEditRocketData] = useState<IRocketListItem | null>(null);

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
        currEditRocketData,
        addOrUpdateRocket,
        removeRocket,
        setShowEditRocketModal,
        setCurrEditRocketData,
      }}>
      {children}
    </RocketContext.Provider>
  );
}
