import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCharacter } from "../actions/getCharacter";

export const GetCharacterExample: React.FC<{ id?: number }> = ({ id }) => {
  const queryClient = useQueryClient();
  const query = useQuery(getCharacter(id || 1));

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
        <pre>
          <label style={{ color: "red", fontWeight: 700, fontSize: "1.5rem" }}>
            Error
          </label>
          <br />
          <label style={{ color: "red", fontWeight: 500, fontSize: "1.2rem" }}>
            The entity with id={id} does not exist.
          </label>
          <br />
          {JSON.stringify(query.error ?? {}, null, 2) as React.ReactNode}
        </pre>
      ) : (
        <pre>
          <label
            style={{ color: "green", fontWeight: 700, fontSize: "1.5rem" }}
          >
            Data
          </label>
          <br />
          {query.isLoading
            ? "Loading..."
            : JSON.stringify(query.data ?? {}, null, 2)}
        </pre>
      )}
    </div>
  );
};

GetCharacterExample.defaultProps = { id: 1 };
