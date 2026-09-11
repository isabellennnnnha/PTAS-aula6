import * as userService from '../services/users.js';

let bancoDeUsuarios = [
  { id: 1, name: 'Diego', email: 'diego@email.com' }
];


const validateUserPayload = (dadosCorpo) => {
  const { name, email } = dadosCorpo;
  if (!name || !email) {
    return { isValid: false, message: 'Os campos "name" e "email" são obrigatórios.' };
  }
  return { isValid: true };
};

export const getUsers = (req, res) => {
  const todosUsuarios = userService.findAll(bancoDeUsuarios);
  return res.json(todosUsuarios);
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  const usuarioEncontrado = userService.findById(bancoDeUsuarios, id);

  if (!usuarioEncontrado) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }
  return res.json(usuarioEncontrado);
};

export const createUser = (req, res) => {
  const validacao = validateUserPayload(req.body);
  if (!validacao.isValid) {
    return res.status(400).json({ erro: validacao.message });
  }

  const { novoUsuario, listaAtualizada } = userService.create(bancoDeUsuarios, req.body);
  bancoDeUsuarios = listaAtualizada; 

  return res.status(201).json(novoUsuario);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  
  const validacao = validateUserPayload(req.body);
  if (!validacao.isValid) {
    return res.status(400).json({ erro: validacao.message });
  }

  const resultado = userService.update(bancoDeUsuarios, id, req.body);
  if (!resultado) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  bancoDeUsuarios = resultado.listaAtualizada;
  return res.json(resultado.usuarioAtualizado);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const listaAtualizada = userService.remove(bancoDeUsuarios, id);

  if (!listaAtualizada) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  bancoDeUsuarios = listaAtualizada;
  return res.status(204).send();
};
