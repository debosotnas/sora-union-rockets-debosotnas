import { RocketContext } from "@/contexts/rockets.context";
import { Card, Pagination, Text, Modal, Button } from "@nextui-org/react";
import { useContext } from "react";
import EditRocketForm from "../rocket-form/EditRocketForm.component";
import { IRocketContextData, IRocketListItem } from "../types/basic";
import RocketList from "./RocketList.component";
import styles from './RocketListContainer.module.scss';

function getEditRocketModal(
  { closeHandler,
    showEditRocketModal,
    rocketItemData
  }: {
    closeHandler: () => void,
    showEditRocketModal: boolean,
    rocketItemData: IRocketListItem | null
  }) {

  return (
    <Modal
      closeButton
      blur
      preventClose
      aria-labelledby="modal-title"
      open={showEditRocketModal}
      onClose={closeHandler}
    >
      <Modal.Body>
        <EditRocketForm rocketInfo={rocketItemData || {}} />
      </Modal.Body>
    </Modal>)
}
function RocketListContainer() {

  const rocketListContext: IRocketContextData = useContext(RocketContext);
  const closeHandler = () => {
    rocketListContext.setShowEditRocketModal && rocketListContext.setShowEditRocketModal(false);
  }

  return (
    <Card className="card-wrapper">
      <Card.Header>
        <Text h2 css={{ m: 0, color: '$colors$primary' }}><i>🚀</i> List of Rockets</Text>
      </Card.Header>
      <Card.Body>
        <RocketList rocketListData={rocketListContext.rocketListData} />
        {getEditRocketModal({
          closeHandler,
          showEditRocketModal: rocketListContext.showEditRocketModal,
          rocketItemData: rocketListContext.currEditRocketData
        })}
      </Card.Body>
      <Card.Footer className={styles.paginationBlock}>
        {/* TODO: Pending implementation */}
        <Pagination animated={false} color="success" total={2} initialPage={1} />
      </Card.Footer>
    </Card>
  );
}

export default RocketListContainer;