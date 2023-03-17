import * as request from "superagent";
import { Character } from "../../interfaces/Character";
import { API_ENDPOINT } from "../../API";

type GetCharactersAPI = () => Promise<Character[]>;
type GetCharacters = () => {
  queryKey: any[];
  queryFn: GetCharactersAPI;
};

const getCharactersAPI: GetCharactersAPI = async () => {
  const res = await request.get(API_ENDPOINT);
  return res.body;
};

export const getCharacters: GetCharacters = () => ({
  queryKey: ["characters"],
  queryFn: getCharactersAPI,
});
