import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";
import { connect } from "react-redux";
import changeTheme from "./actionCreator/changeTheme";
import changeLocation from "./actionCreator/changeLocation";

const SearcParams = props => {
  const [breeds, updateBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, updateBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    updateBreeds([]);
    updateBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedNames = breeds.map(({ name }) => name);
      updateBreeds(breedNames);
    }, console.error);
  }, [animal]);

  const requestPets = async () => {
    const { animals } = await pet.animals({
      location: props.location,
      breed,
      type: animal
    });

    setPets(animals || []);
  };

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={props.location}
            placeholder="Location"
            onChange={e => props.updateLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />

        <label htmlFor="theme">
          Theme
          <select
            id="theme"
            value={props.theme}
            onChange={e => props.setTheme(e.target.value)}
            onBlur={e => props.setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>

        <button style={{ backgroundColor: props.theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

const mapStateToProps = ({ theme, location }) => ({ theme, location });
const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(changeTheme(theme)),
  updateLocation: location => dispatch(changeLocation(location))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearcParams);
