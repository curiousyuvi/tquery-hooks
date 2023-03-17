import { renderHook, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { expectTypeOf } from "vitest";
import { expect, test } from "vitest";
import { createWrapper } from "../../testUtils";
import { Character } from "../../interfaces/Character";
import { createCharacter } from ".";
import request from "superagent";
import { API_ENDPOINT } from "../../API";

const newCharacter = {
  id: 9999999,
  name: "Sponge Bob",
  alias: "Mr. SquarePants",
  image_url: "",
};

const deleteTestCharacter = async () => {
  await request.delete(API_ENDPOINT + "/9999999");
  console.log("Test character deleted!");
};

beforeAll(async () => {
  try {
    await deleteTestCharacter();
  } catch (err) {
    console.log("API failed");
  }
});

afterAll(async () => {
  try {
    await deleteTestCharacter();
  } catch (err) {
    console.log("API failed");
  }
});

describe("[POST] Character", () => {
  test("Hook - Successful", async () => {
    const { result } = renderHook(
      () => useQuery(createCharacter(newCharacter)),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // @ts-ignore
    expectTypeOf(result.current.data).toMatchTypeOf<Character>();
  });

  test("Hook - Failure", async () => {
    // This api call should fail because we already have created a character with id=9999999 before
    const { result } = renderHook(
      () => useQuery(createCharacter(newCharacter)),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    // @ts-ignore
    expect(result.current.error.status).toBe(500);
    expect(result.current.error).toBeDefined();
  });
});
