import * as request from "superagent";
import { Character } from "../../interfaces/Character";
import { API_ENDPOINT } from "../../API";

type CreateCharacterAPI = (character: Character) => Promise<Character>;
type CreateCharacter = (newCharacter: Character) => {
  queryKey: any[];
  queryFn: () => Promise<Character>;
};

const createCharacterAPI: CreateCharacterAPI = async (characeter) => {
  const res = await request.post(API_ENDPOINT).send(characeter);
  return res.body;
};

export const createCharacter: CreateCharacter = (newCharacter) => ({
  queryFn: () => createCharacterAPI(newCharacter),
  queryKey: ["post-character", newCharacter.id],
});
