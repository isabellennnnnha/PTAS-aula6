import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './controllers/users.js';

const app = express();
app.use(express.json()); 


app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});
