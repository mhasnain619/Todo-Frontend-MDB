import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdateList = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [todo, setTodo] = useState({
        todoText: "",
        status: "Pending",
    });

    // ✅ Fetch existing task data when the component mounts
    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/getTodo/${id}`);
                setTodo({ todoText: response.data.todo, status: response.data.status });
            } catch (error) {
                console.error("Error fetching todo:", error.response?.data || error.message);
            }
        };
        fetchTodo();
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!todo.todoText.trim()) {
            console.error("Todo text is empty");
            return;
        }

        try {
            const todoData = {
                todo: todo.todoText, //  Match backend field
                status: todo.status
            };

            await axios.put(`http://localhost:8000/api/updateTodo/${id}`, todoData, {
                headers: { "Content-Type": "application/json" }
            });
            navigate("/");
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <Container className="mt-5 p-4 border rounded shadow-lg" style={{ width: "1000px", background: "#fff" }}>
            {/*  Corrected Header */}
            <div className="bg-primary text-white text-center py-3 rounded-top">
                <h2 className="fw-bold">Update Task</h2>
            </div>

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
                        <Button variant="success" size="lg" type="submit">Update Task</Button>
                        <Button variant="secondary" size="lg" type="button" onClick={handleCancel}>Cancel</Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default UpdateList;
