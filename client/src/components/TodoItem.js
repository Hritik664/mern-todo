import React, { useState } from 'react';
import { format } from 'date-fns';
import { Trash2, Edit, Check, X } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/todos/${todo._id}`, editedTodo);
      onUpdate(response.data);
      setIsEditing(false);
      toast.success('Todo updated successfully');
    } catch (error) {
      toast.error('Failed to update todo');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/todos/${todo._id}`);
      onDelete(todo._id);
      toast.success('Todo deleted successfully');
    } catch (error) {
      toast.error('Failed to delete todo');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedTodo.title}
            onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={editedTodo.description}
            onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            value={editedTodo.dueDate.split('T')[0]}
            onChange={(e) => setEditedTodo({ ...editedTodo, dueDate: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button onClick={handleUpdate} className="p-2 text-green-600 hover:bg-green-50 rounded">
              <Check size={20} />
            </button>
            <button onClick={() => setIsEditing(false)} className="p-2 text-red-600 hover:bg-red-50 rounded">
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.title}
            </h3>
            <div className="flex space-x-2">
              <button onClick={() => setIsEditing(true)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                <Edit size={20} />
              </button>
              <button onClick={handleDelete} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <p className="text-gray-600 mt-2">{todo.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              Due: {format(new Date(todo.dueDate), 'MMM d, yyyy')}
            </span>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onUpdate({ ...todo, completed: !todo.completed })}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-sm text-gray-600">Complete</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;