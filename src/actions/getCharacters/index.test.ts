import { renderHook, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { expectTypeOf } from "vitest";
import { expect, test } from "vitest";
import { createWrapper } from "../../testUtils";
import { getCharacters } from ".";
import { Character } from "../../interfaces/Character";

describe("[GET] Characters", () => {
  test("Hook - Successful", async () => {
    const { result } = renderHook(() => useQuery(getCharacters()), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // @ts-ignore
    expectTypeOf(result.current.data).toMatchTypeOf<Character[]>();
  });
});
