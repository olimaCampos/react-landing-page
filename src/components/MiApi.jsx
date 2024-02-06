import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Buscador } from "./Buscador";

export const MiApi = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const route = `https://swapi.dev/api/people?page=${page}`;
    fetch(route)
      .then((response) => response.json())
      .then((data) => {
        const characterId = data.results.map((character) => {
          const startingId = character.url.slice(-3).slice(0, -1);
          return {
            ...character,
            id: startingId,
            firstName: character.name.split(" ")[0]
          };
        });
        characterId.sort(function (a, b) {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        });
        
        console.log(characterId);
        setCharacters(characterId);
        setFilteredCharacters(characterId);
      })
      .catch((error) => {
        console.log("Error al recibir data", error);
      });
  }, [page]);

  const handleSearch = (query) => {
    const route = `https://swapi.dev/api/people?search=${query}`;
    fetch(route)
      .then((response) => response.json())
      .then((data) => {
        const characterId = data.results.map((character) => {
          const slicedUrl = character.url.slice(-3);
          const startingId = slicedUrl.slice(0, -1);
          return {
            ...character,
            id: startingId,
            firstName: character.name.split(" ")[0]
          };
        });
        characterId.sort(function (a, b) {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        });
        setCharacters(characterId);
        setFilteredCharacters(characterId);
      })
      .catch((error) => {
        console.log("Error al recibir data", error);
      });
    if (query) {
      const filtered = characters.filter((character) => {
        return character.name.toLowerCase().includes(query.toLowerCase());
      });
      setFilteredCharacters(filtered);
    } else {
      setFilteredCharacters(characters);
    }
  };

  const imagePath = (id) => `/assets/img/people/${id}.jpg`;

  return (
    <>
      <Buscador onSearch={handleSearch} />
      <div className="main">
        {filteredCharacters.map((character) => (
          <Card
            key={character.name}
            className="card"
            style={{ width: "20rem" }}
            bg="dark"
            text="light"
          >
            <Card.Img
              variant="top"
              src={imagePath(character.id)}
              alt={character.name}
            />
            <Card.Body>
              <Card.Title>{character.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                Birth Year: {character.birth_year}
              </ListGroup.Item>
              <ListGroup.Item>Gender: {character.gender}</ListGroup.Item>
              <ListGroup.Item>Height: {character.height}</ListGroup.Item>
            </ListGroup>
          </Card>
        ))}
      </div>
      <div className="pagination">
        <Button
          onClick={() => setPage(page - 1 < 1 ? 1 : page - 1)}
          variant="outline-primary"
        >
          Anterior
        </Button>{" "}
        <Button
          onClick={() => setPage(page + 1 > 9 ? 9 : page + 1)}
          variant="outline-primary"
        >
          Siguiente
        </Button>{" "}
      </div>
    </>
  );
};
