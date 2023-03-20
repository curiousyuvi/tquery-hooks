import * as request from "superagent";
import { Character } from "../../interfaces/Character";
import { API_ENDPOINT } from "../../API";
import { UpdatedCharacter } from "../../interfaces/UpdatedCharacter";

type UpdateCharacterAPI = (
  updatedCharacter: UpdatedCharacter
) => Promise<Character>;
type UpdateCharacter = (updatedCharacter: UpdatedCharacter) => {
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
  queryKey: ["post-character", updatedCharacter.id],
});
