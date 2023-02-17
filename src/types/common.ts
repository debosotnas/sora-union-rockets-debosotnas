export interface IGithubUserDetails {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    score: number;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
}

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
    showEditRocketModal: IRocketListItem | boolean;
    githubSuggestions: Array<IGithubUserDetails>
    addOrUpdateRocket?(rocket:IRocketListItem): void;
    removeRocket?(rocket:IRocketListItem): void;
    setShowEditRocketModal?(val:IRocketListItem | boolean): void;
    setGithubSuggestions?(val:Array<IGithubUserDetails>): void;
}

export type TRocketItemToCreate = Omit<IRocketListItem, 'id'>;

