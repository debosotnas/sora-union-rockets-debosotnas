import { IRocketListItem, TypeRocketItemToCreate } from "@/components/types/basic";

// TODO: Add Error exception handler
export function httpCreateRocket(rocket: TypeRocketItemToCreate) {
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