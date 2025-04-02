import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();
    // Fetch data when the component mounts
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("http://localhost:8000/getTodo");
                setTodos(response.data.getData); // Store the fetched todos
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };
        fetchTodos();
    }, []);
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/deleteTodo/${id}`);
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };
    const gotoAddNewTask = () => navigate("/addnewtask");
    const updateTask = (id) => navigate(`/updateTodo/${id}`);

    return (
        <Container className="mt-4" style={{ width: "1000px" }}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center bg-primary text-white p-4 rounded">
                <h2 className="fw-bold">My To-Do List</h2>
                <Button onClick={gotoAddNewTask} variant="success" size="lg">
                    + Add New Task
                </Button>
            </div>

            {/* Table */}
            <Table striped bordered hover className="mt-4" style={{ fontSize: "1.2rem" }}>
                <thead className="bg-light">
                    <tr >
                        <th>S.N</th>
                        <th>Task</th>
                        <th>Status</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <tr key={todo._id} style={{ height: "70px" }}>
                            <td className="align-middle">{index + 1}</td>
                            <td className="align-middle">{todo.todo}</td>
                            <td className='align-middle'>
                                <Button size="lg" style={{ border: 'none' }} className={`${todo.status === "Completed" ? "bg-success text-white" : "bg-warning text-dark"}`}>
                                    {todo.status}
                                </Button>
                            </td>                            <td className="text-center align-middle">
                                <Button onClick={() => updateTask(todo._id)} variant="info" size="lg" className="me-3 px-4">
                                    <FaEdit />
                                </Button>
                                <Button onClick={() => deleteTodo(todo._id)} variant="danger" size="lg" className="px-4">
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default TodoList;
