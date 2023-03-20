import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCharacters } from "../actions/getCharacters";

export function Fetcher() {
  const queryClient = useQueryClient();
  const query = useQuery(getCharacters());

  return (
    <div>
      <div>
        <button
          onClick={() => {
            queryClient.invalidateQueries();
          }}
        >
          Invalidate Query
        </button>

        <button onClick={() => query.refetch()}>Fetch Query</button>
      </div>

      {query.isError ? (
        <div>{(query.error ?? "Error") as React.ReactNode}</div>
      ) : (
        <pre>
          <div>
            {query.isLoading
              ? "Loading..."
              : JSON.stringify(query.data ?? [], null, 2)}
          </div>
        </pre>
      )}
    </div>
  );
}
