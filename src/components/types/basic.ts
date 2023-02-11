export interface IRocketListItem {
    id: number;
    title: string;
    name: string;
    description: string;
    githubUserInfo: string;
}

export interface IRocketContextData {
    rocketListData: Map<number, IRocketListItem>;
    isLoadingData: boolean;
    addOrUpdateRocket?(rocket:IRocketListItem): void;
    removeRocket?(rocket:IRocketListItem): void;
}