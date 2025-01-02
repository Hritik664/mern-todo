// import React, { useState, useEffect } from 'react';
// import { Search } from 'lucide-react';
// import api from '../utils/api';
// import toast from 'react-hot-toast';

// const AdminTodoList = () => {
//   const [todos, setTodos] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchAllTodos();
//   }, []);

//   const fetchAllTodos = async () => {
//     try {
//       const response = await api.get('/todos/all');
//       setTodos(response.data);
//     } catch (error) {
//       toast.error('Failed to fetch todos');
//     }
//   };

//   const handleDelete = async (todoId) => {
//     try {
//       await api.delete(`/todos/admin/${todoId}`);
//       setTodos(todos.filter(todo => todo._id !== todoId));
//       toast.success('Todo deleted successfully');
//     } catch (error) {
//       toast.error('Failed to delete todo');
//     }
//   };

//   const filteredTodos = todos.filter(todo =>
//     todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     todo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     todo.user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-2xl font-bold mb-6">All Users' Todos</h2>
        
//         <div className="relative w-full sm:w-64 mb-6">
//           <input
//             type="text"
//             placeholder="Search todos or users..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border rounded"
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//         </div>

//         <div className="space-y-4">
//           {filteredTodos.map((todo) => (
//             <div key={todo._id} className="bg-white border rounded-lg p-4">
//               <div className="flex justify-between items-start mb-2">
//                 <div>
//                   <h3 className="font-semibold">{todo.title}</h3>
//                   <p className="text-sm text-gray-600">By: {todo.user.email}</p>
//                 </div>
//                 <button
//                   onClick={() => handleDelete(todo._id)}
//                   className="text-red-600 hover:text-red-800"
//                 >
//                   Delete
//                 </button>
//               </div>
//               <p className="text-gray-700">{todo.description}</p>
//               <div className="mt-2 text-sm text-gray-500">
//                 Due: {new Date(todo.dueDate).toLocaleDateString()}
//               </div>
//             </div>
//           ))}
//           {filteredTodos.length === 0 && (
//             <p className="text-center text-gray-500">No todos found</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminTodoList;