import { renderHook, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { expectTypeOf } from "vitest";
import { expect, test } from "vitest";
import { createWrapper } from "../../testUtils";
import { Character } from "../../interfaces/Character";
import request from "superagent";
import { API_ENDPOINT } from "../../API";
import { updateCharacter } from ".";

const updatedCharacter = {
  id: 8999999,
  alias: "Mr. SquarePants, Chef of Krabby Patty",
};

const deleteTestCharacter = async () => {
  try {
    await request.delete(API_ENDPOINT + "/8999999");
    console.log("Test character deleted!");
  } catch (err) {
    console.log("API failed");
  }
};

beforeAll(async () => {
  const newCharacter = {
    id: 8999999,
    name: "Sponge Bob",
    alias: "Mr. SquarePants",
    image_url: "",
  };

  const createTestCharacter = async () => {
    try {
      await request.post(API_ENDPOINT).send(newCharacter);
      console.log("Test character created!");
    } catch (err) {
      console.log("API failed");
    }
  };
  await createTestCharacter();
});

afterAll(async () => {
  await deleteTestCharacter();
});

describe("[PUT] Character", () => {
  test("Hook - Successful", async () => {
    const { result } = renderHook(
      () => useQuery(updateCharacter(updatedCharacter)),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // @ts-ignore
    expectTypeOf(result.current.data).toMatchTypeOf<Character>();
  });

  test("Hook - Failure", async () => {
    // This api call should fail because we are deleting the test character which is to be updated
    await deleteTestCharacter();
    const { result } = renderHook(
      () => useQuery(updateCharacter(updatedCharacter)),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    // @ts-ignore
    expect(result.current.error.status).toBe(404);
    expect(result.current.error).toBeDefined();
  });
});
