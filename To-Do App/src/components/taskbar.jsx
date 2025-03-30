import React, { useState ,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';

const Taskbar = () => {
    const [todo, setTodo] = useState("");
    const [editId, setEditId] = useState(null);
    const [todos, setTodos] = useState(() => {
        
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : []; 
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleAdd = () => {
        if (todo.trim() === "") return;

        if (editId) {
            setTodos(todos.map(item => item.id === editId ? { ...item, todo } : item));
            setEditId(null);
        } else {
            setTodos([...todos, { todo, isCompleted: false, id: uuidv4() }]);
        }

        setTodo("");
        savetodoLs()
    };

    const handleDone = (id) => {
        setTodos(todos.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item));
        savetodoLs()
    };

    const handleDelete = (id) => {
        setTodos(todos.filter(item => item.id !== id));
        savetodoLs()
    };

    const handleEdit = (id) => {
        let selectedTodo = todos.find(item => item.id === id);
        if (selectedTodo) {
            setEditId(id);
            setTodo(selectedTodo.todo);
        }
        savetodoLs()
    };

    const handleChange = (e) => {
        setTodo(e.target.value);
    };

    return (
        <div className="taskbar bg-[rgb(230,254,199)] w-full sm:w-[80%] md:w-[60%] lg:w-[40%] mx-auto mt-5 rounded-lg p-4 shadow-lg">
            <div className="head p-2 font-bold text-lg border-b-[3px] border-white text-center">Your Tasks</div>

            <div className="addtask flex flex-col sm:flex-row items-center gap-2 p-2">
                <input type="text" onChange={handleChange} value={todo}
                    className="border border-gray-300 rounded px-3 py-2 w-full text-sm md:text-base"
                    placeholder="Add or edit a task"
                />
                <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto">
                    {editId ? "Update" : "Add"}
                </button>
            </div>

            {todos.map(item => (
                <div key={item.id} className="yourtasks w-full h-auto items-center pb-2">
                    <ul className='flex flex-col gap-2'>
                        <li className='flex justify-between items-center w-full p-3 bg-white rounded-md shadow-md'>
                            <div className="task flex gap-[10px] w-[80%]">
                                <button onClick={() => handleEdit(item.id)} className={`bg-transparent rounded-md  ${item.isCompleted ? 'hidden' : 'inline'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="13px" viewBox="0 -960 960 960" width="13px" fill="#000000">
                                        <path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z" />
                                    </svg>
                                </button>
                                <p className={`w-[70%] ${item.isCompleted ? 'line-through text-gray-500' : ''} text-sm md:text-base`}>
                                    {item.todo}
                                </p>
                            </div>
                            <div className="btns flex gap-2">
                                <button onClick={() => handleDone(item.id)} className='bg-green-500 p-2 rounded-md hover:bg-green-600'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#f5f5f5">
                                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                                    </svg>
                                </button>
                                <button onClick={() => handleDelete(item.id)} className='bg-red-500 p-2 rounded-md hover:bg-red-600'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#f5f5f5">
                                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Taskbar;
