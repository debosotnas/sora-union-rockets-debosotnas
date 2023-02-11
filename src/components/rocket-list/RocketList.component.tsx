import { RocketContext } from "@/contexts/rockets.context";
import { useContext } from "react";
import { IRocketContextData, IRocketListItem } from "../types/basic";

function RocketList() {

  const rocketListContext: IRocketContextData = useContext(RocketContext);
  const rocketListData: Map<number, IRocketListItem> = rocketListContext.rocketListData;
  console.log('>> rocketListData: ', rocketListData);

  return (
      <></>
  );
}

export default RocketList;