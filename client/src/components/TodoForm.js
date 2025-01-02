import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const TodoForm = ({ onTodoAdded }) => {
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/todos', todo);
      onTodoAdded(response.data);
      setTodo({
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0]
      });
      toast.success('Todo added successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add todo');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Add New Todo</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={todo.dueDate}
          onChange={(e) => setTodo({ ...todo, dueDate: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default TodoForm;