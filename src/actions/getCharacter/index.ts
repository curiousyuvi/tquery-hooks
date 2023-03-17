import * as request from "superagent";
import { Character } from "../../interfaces/Character";
import { API_ENDPOINT } from "../../API";

type GetCharacterAPI = (id: number) => Promise<Character>;
type GetCharacter = (id: number) => {
  queryKey: any[];
  queryFn: () => Promise<Character>;
};

const getCharacterAPI: GetCharacterAPI = async (id) => {
  const res = await request.get(API_ENDPOINT + `/${id}`);
  return res.body;
};

export const getCharacter: GetCharacter = (id) => ({
  queryKey: ["characters", id],
  queryFn: () => getCharacterAPI(id),
});
