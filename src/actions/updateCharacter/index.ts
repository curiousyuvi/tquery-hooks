import * as request from "superagent";
import { Character } from "../../interfaces/Character";
import { API_ENDPOINT } from "../../API";

type UpdateCharacterAPI = (updatedCharacter: any) => Promise<Character>;
type UpdateCharacter = (updatedCharacter: any) => {
  queryKey: any[];
  queryFn: () => Promise<Character>;
};

const updateCharacterAPI: UpdateCharacterAPI = async (character) => {
  const res = await request
    .put(API_ENDPOINT + `/${character.id}`)
    .send(character);
  return res.body;
};

export const updateCharacter: UpdateCharacter = (updatedCharacter) => ({
  queryFn: () => updateCharacterAPI(updatedCharacter),
  queryKey: ["post-character"],
});
