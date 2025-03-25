import React from "react";
import { Category } from "../models/Category";
import { CategoryService } from "../services/CategoryService";
import { Modal, Button, Form } from "react-bootstrap";

const CategoryListPage: React.FC = () => {
  const [categories, setCategories] = React.useState<Category[]>();

  React.useEffect(() => {
    const fetchCategories = async () => {
      const categories = await CategoryService.getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const [modalState, setModalState] = React.useState<{
    isOpen: boolean;
    isDeleteModalOpen?: boolean;
    category?: Category;
    isNew?: boolean;
  }>({ isOpen: false });

  const [formState, setFormState] = React.useState<{
    name: string;
    description: string;
  }>({ name: "", description: "" });

  React.useEffect(() => {
    if (modalState.category) {
      setFormState({
        name: modalState.category.name || "",
        description: modalState.category.description || "",
      });
    } else {
      setFormState({ name: "", description: "" });
    }
  }, [modalState.category]);

  const handleAdd = () => {
    setModalState({ isOpen: true, isNew: true });
  };

  const handleEdit = (uuid: string) => {
    const categoryToEdit = categories?.find(
      (category) => category.uuid === uuid
    );
    if (categoryToEdit) {
      setModalState({ isOpen: true, category: categoryToEdit, isNew: false });
    }
  };

  const handleSave = () => {
    if (modalState.isNew) {
      const newCategory = {
        name: formState.name,
        description: formState.description,
      };
      CategoryService.createCategory(newCategory)
        .then((createdCategory) => {
          setCategories((prevCategories) => [
            ...(prevCategories || []),
            createdCategory,
          ]);
          setModalState({ isOpen: false });
        })
        .catch((error) => {
          console.error("Failed to add category:", error);
        });
    } else if (modalState.category) {
      const updatedCategory = {
        ...modalState.category,
        name: formState.name,
        description: formState.description,
      };
      CategoryService.updateCategory(updatedCategory)
        .then(() => {
          setCategories((prevCategories) =>
            prevCategories?.map((category) =>
              category.uuid === updatedCategory.uuid
                ? updatedCategory
                : category
            )
          );
          setModalState({ isOpen: false });
        })
        .catch((error) => {
          console.error("Failed to update category:", error);
        });
    }
  };

  const handleCancel = () => {
    setModalState({ isOpen: false });
  };

  const handleDelete = (uuid: string) => {
    setModalState({
      isOpen: false,
      isDeleteModalOpen: true,
      category: categories?.find((category) => category.uuid === uuid),
      isNew: false,
    });
  };

  const handleConfirmDelete = (uuid: string) => {
    CategoryService.deleteCategory(uuid)
      .then(() => {
        setCategories((prevCategories) =>
          prevCategories?.filter((category) => category.uuid !== uuid)
        );
        setModalState({ isOpen: false });
      })
      .catch((error) => {
        console.error(`Failed to delete category with uuid: ${uuid}`, error);
      });
  };

  const renderDeleteModal = () => {
    if (!modalState.category) return null;

    return (
      <Modal
        show={modalState.isDeleteModalOpen}
        onHide={() =>
          setModalState({ isOpen: false, isDeleteModalOpen: false })
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the category "
          <strong>{modalState.category.name}</strong>"?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setModalState({ isOpen: false })}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              modalState.category?.uuid &&
              handleConfirmDelete(modalState.category.uuid)
            }
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex justify-content-center mb-3">
            <Button onClick={handleAdd}>Add Category</Button>
          </div>
          <table className="table table-bordered table-hover text-center">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() =>
                        category.id !== undefined &&
                        category.uuid &&
                        handleEdit(category.uuid)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        category.id !== undefined &&
                        category.uuid &&
                        handleDelete(category.uuid)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal show={modalState.isOpen} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalState.isNew ? "Add Category" : "Edit Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCategoryName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategoryDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formState.description}
                onChange={(e) =>
                  setFormState({ ...formState, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {modalState.isNew ? "Add Category" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>

      {renderDeleteModal()}
    </div>
  );
};

export default CategoryListPage;
