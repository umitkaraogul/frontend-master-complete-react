import React from "react";
import { Pet } from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No pets found</h1>
      ) : (
        pets.map(
          ({
            type: animal,
            id,
            name,
            photos: media,
            breeds: { primary },
            contact: { address }
          }) => (
            <Pet
              key={id}
              name={name}
              animal={animal}
              breed={primary}
              media={media}
              location={`${address.city}, ${address.state}`}
              id={id}
            />
          )
        )
      )}
    </div>
  );
};

export default Results;
