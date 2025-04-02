import { Route, Routes } from 'react-router-dom';
import TodoList from '../components/Home';
import AddTodoList from '../components/AddTodoList';
import UpdateList from '../components/UpdateList';

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/addnewtask" element={<AddTodoList />} />
                <Route path="/updateTodo/:id" element={<UpdateList />} />
            </Routes>
        </>
    )
}

export default Router
