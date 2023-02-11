import { RocketContext } from "@/contexts/rockets.context";
import { Card, Text } from "@nextui-org/react";
import { useContext } from "react";
import { IRocketContextData, IRocketListItem } from "../types/basic";
import RocketList from "./RocketList.component";

function RocketListContainer() {

  const rocketListContext: IRocketContextData = useContext(RocketContext);
  // const rocketListData: Map<number, IRocketListItem> = rocketListContext.rocketListData;
  // console.log('>> rocketListData: ', rocketListData);

  return (
    <Card className="card-wrapper">
      <Card.Header>
        <Text h2 css={{ m: 0, color: '$colors$primary' }}><i>🚀</i> List of Rockets</Text>
      </Card.Header>
      <Card.Body>
        <RocketList rocketListData={rocketListContext.rocketListData} />
      </Card.Body>
    </Card>
  );
}

export default RocketListContainer;