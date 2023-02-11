import { IRocketContextData, IRocketListItem } from "@/components/types/basic";
import { createContext, useState } from "react";

const rocketContextData: IRocketContextData = {
  rocketListData: new Map(),
  isLoadingData: false
}

export const RocketContext = createContext(rocketContextData);

export function RocketProvider({ children }: { children: any }) {
  const [rockets, setRockets] = useState<Map<number, IRocketListItem>>(new Map());

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
    <RocketContext.Provider value={{ isLoadingData: false, rocketListData: rockets, addOrUpdateRocket, removeRocket }}>
      {children}
    </RocketContext.Provider>
  );
}
