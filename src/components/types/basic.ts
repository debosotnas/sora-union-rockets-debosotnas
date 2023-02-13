export interface IRocketListItem {
    id: number;
    title: string;
    name: string;
    description: string;
    githubUserInfo: string;
    dtcreation?: Date;
    dtupdated?: Date;
}

export interface IRocketContextData {
    rocketListData: Map<number, IRocketListItem>;
    isLoadingData: boolean;
    showEditRocketModal: boolean;
    currEditRocketData: IRocketListItem | null;
    addOrUpdateRocket?(rocket:IRocketListItem): void;
    removeRocket?(rocket:IRocketListItem): void;
    setShowEditRocketModal?(val:boolean): void;
    setCurrEditRocketData?(val:IRocketListItem | null): void;
}

export type TypeRocketItemToCreate = Omit<IRocketListItem, 'id'>;
