Getting ready to deploy on a DO droplet. Printed instructions. I've not been coding as much as reviewing and putting off this process. But I've done it before...just because it wasn't easy, I did do it. And I'm sure it will actually be much easier because I have a clue about what I am doing. But PTSD hurts. Let's crush it tomorrow. Plus there's nothing I can't undo. 

Looking at adding search params. By date and category. 

### SearchParams.jsx

```
import { useEffect, useState } from "react";
import Image from "./Image";
import useCatagoryList from './useCatagory list'


const SearchParams = () => {
  const [pets, setPets] = useState([]);
  const [location, setLocation] = useState("");

  const [breed, setCatagory] = useState("");
  const [breeds] = useCatagoryList(animal);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setCatagory("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setCatagory("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Catagory
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => setCatagory(e.target.value)}
            onBlur={(e) => setCatagory(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      {pets.map((pet) => (
        <Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id}
        />
      ))}
    </div>
  );
};

export default SearchParams;
```

Also look at this link.

App loads structure. And takes search params and details. 

Details and Pet are much the same...
The api queries are kept in separate files. we dont need useBreedList or fetch Breed List.