import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import api from '../utils/api';
import toast from 'react-hot-toast';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get('/todos');
      setTodos(response.data);
    } catch (error) {
      toast.error('Failed to fetch todos');
    }
  };

  const handleTodoAdded = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const handleTodoUpdated = (updatedTodo) => {
    setTodos(todos.map(todo => 
      todo._id === updatedTodo._id ? updatedTodo : todo
    ));
  };

  const handleTodoDeleted = (todoId) => {
    setTodos(todos.filter(todo => todo._id !== todoId));
  };

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'completed') return todo.completed;
      if (filter === 'active') return !todo.completed;
      return true;
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <TodoForm onTodoAdded={handleTodoAdded} />
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search todos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border rounded"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={handleTodoUpdated}
              onDelete={handleTodoDeleted}
            />
          ))}
          {filteredTodos.length === 0 && (
            <p className="text-center text-gray-500">No todos found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;