import axios from "axios";
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddTodoList = () => {
    const [todo, setTodo] = useState({
        todoText: "",
        status: "Pending",
    });

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure todoText is a string and not empty
        if (!todo.todoText.trim()) {
            console.error("Todo text is empty");
            return;
        }

        try {
            const todoData = {
                todo: todo.todoText,  // Send the correct field expected by the backend
                status: todo.status
            };

            await axios.post("http://localhost:8000/api/addTodo",
                todoData,  // Corrected data structure
                { headers: { "Content-Type": "application/json" } } // Ensure JSON headers
            );

            console.log("Todo added successfully");
            setTodo({ todoText: "", status: "Pending" }); // Reset the form
            navigate("/"); // Redirect after submission
        } catch (error) {
            console.error("Error adding task:", error.response ? error.response.data : error);
        }
    };



    const handleCancel = () => {
        setTodo({ todoText: "", status: "Pending" });
        navigate("/");
    };

    return (
        <Container className="mt-5 p-4 border rounded shadow-lg" style={{ width: "1000px", background: "#fff" }}>

            {/* Header */}
            <div className="bg-primary text-white text-center py-3 rounded-top">
                <h2 className="fw-bold">Add New Task</h2>
            </div>

            {/* Form Section */}
            <div className="p-4">
                <Form onSubmit={handleSubmit}>
                    {/* Task Name */}
                    <Form.Group className="mb-3">
                        <Form.Control
                            name="todoText"
                            value={todo.todoText}
                            onChange={(e) => setTodo({ ...todo, todoText: e.target.value })}
                            type="text"
                            placeholder="Enter task..."
                            required
                        />
                    </Form.Group>

                    {/* Status Dropdown */}
                    <Form.Group className="mb-3">
                        <Form.Select
                            name="status"
                            value={todo.status}
                            onChange={(e) => setTodo({ ...todo, status: e.target.value })}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </Form.Select>
                    </Form.Group>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between">
                        <Button variant="success" size="lg" type="submit">Add Task</Button>
                        <Button variant="secondary" size="lg" type="button" onClick={handleCancel}>Cancel</Button>
                    </div>
                </Form>
            </div>

        </Container>
    );
};

export default AddTodoList;
