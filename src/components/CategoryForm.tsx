import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Category } from "../models/Category";
import { CategoryService } from "../services/CategoryService";

interface CategoryFormProps {
  category?: Category;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category }) => {
  const [categoryName, setCategoryName] = useState(category?.name || "");
  const [categoryDescription, setCategoryDescription] = useState(
    category?.description || ""
  );
  const isNew = !category;

  const handleSave = async () => {
    if (isNew) {
      category = {
        name: "",
      };

      await CategoryService.createCategory({
        ...category,
        name: categoryName,
        description: categoryDescription,
      });
    } else {
      await CategoryService.updateCategory({
        ...category,
        name: categoryName,
        description: categoryDescription,
      });
    }
  };

  return (
    <Form>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
        />
      </Form.Group>
      <Button onClick={handleSave}>{isNew ? "Save" : "Update"}</Button>
    </Form>
  );
};

export default CategoryForm;
