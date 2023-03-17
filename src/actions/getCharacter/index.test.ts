import { renderHook, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { expectTypeOf } from "vitest";
import { expect, test } from "vitest";
import { createWrapper } from "../../testUtils";
import { Character } from "../../interfaces/Character";
import { getCharacter } from ".";

describe("[GET] Character", () => {
  test("Hook - Successful", async () => {
    const { result } = renderHook(() => useQuery(getCharacter(1)), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // @ts-ignore
    expectTypeOf(result.current.data).toMatchTypeOf<Character>();
  });

  test("Hook - Failure", async () => {
    const { result } = renderHook(() => useQuery(getCharacter(84834)), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    // @ts-ignore
    expect(result.current.error.status).toBe(404);
    expect(result.current.error).toBeDefined();
  });
});
