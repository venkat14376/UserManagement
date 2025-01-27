import React, { useState, useEffect } from 'react';
import api from './services/api';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await api.post('/users', user);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const editUser = async (user) => {
    try {
      await api.put(`/users/${user.id}`, user);
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>User Management</h1>
      <UserForm userToEdit={editingUser} onSubmit={editingUser ? editUser : addUser} />
      <UserList users={users} onDelete={deleteUser} onEdit={setEditingUser} />
    </div>
  );
}

export default App;
