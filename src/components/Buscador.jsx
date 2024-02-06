import { useState } from "react";
import { Form } from "react-bootstrap";

export const Buscador = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <Form className="search-bar">
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>
    </Form>
  );
};
