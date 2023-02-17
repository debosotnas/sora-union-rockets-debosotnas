import { IRocketListItem, TRocketItemToCreate } from "@/types/common";

const GITHUB_BASE_PATH = 'https://api.github.com';

const getGithubSearchURL = (name: string, page: number = 1) => 
  `${GITHUB_BASE_PATH}/search/users?q=${encodeURIComponent(name)}+in:login&page=${page}&per_page=10`;
const getGithubUserInfoURL = (name: string) =>
  `${GITHUB_BASE_PATH}/users/${encodeURIComponent(name)}`;

// TODO: Add Error exception handler
export function httpCreateRocket(rocket: TRocketItemToCreate) {
  const newId = Math.ceil(Math.random() * +(new Date()));

  const createdRocket: IRocketListItem = {
    ...rocket,
    id: newId
  };

  return createdRocket;
}

// TODO: Add Error exception handler
export function httpUpdateRocket(rocket: IRocketListItem) {
  return rocket;
}

async function getGithubUsersByName(name: string) {
  if (!name.length) {
    console.log('>> name empty, didnt search!');
    return new Promise((resolve) => resolve(false)) ;
  }
  try {
    const res = await fetch(getGithubSearchURL(name));
    const data = await res.json();  
    return data;
  } catch (err) {
    console.log(` >> Error get Users: ${name} - err: ${err}`);
  }
}

export function getGithubUsersByNameMemo() {
  const cache = new Map();
  return async (name: string) => {
    const result = cache.get(name);
    if (!result) {
      const data = await getGithubUsersByName(name);
      cache.set(name, data);
      return data;
    } else {
      return result;
    }
  }
}

async function getGithubUserInfo(name: string) {
  if (!name.length) {
    console.log('>> name empty, didnt search!');
    return new Promise((resolve) => resolve(false)) ;
  }
  try {
    const res = await fetch(getGithubUserInfoURL(name));
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(` >> Error get User: ${name} - err: ${err}`);
  }
}

export function getGithubUserInfoMemo() {
  const cache = new Map();
  return async (name: string) => {
    const result = cache.get(name);
    if (!result) {
      const data = await getGithubUserInfo(name);
      cache.set(name, data);
      return data;
    } else {
      return result;
    }
  }
}
