import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { updateCharacter } from "../actions/updateCharacter";

export const UpdateCharacterExample: React.FC<{
  id: number;
  name: string;
  alias: string;
  image_url: string;
}> = (props) => {
  const queryClient = useQueryClient();
  const query = useQuery(updateCharacter(props));

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

        <button onClick={() => useQuery(updateCharacter(props))}>
          Post Query
        </button>
      </div>

      {query.isError ? (
        <pre>
          <label style={{ color: "red", fontWeight: 700, fontSize: "1.5rem" }}>
            Error
          </label>
          <br />
          <label style={{ color: "red", fontWeight: 500, fontSize: "1.2rem" }}>
            The entity with id={props.id} does not exist.
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

UpdateCharacterExample.defaultProps = {
  id: 9999999,
  name: "Sponge Bob",
  alias: "Mr. SquarePants",
  image_url: "",
};
