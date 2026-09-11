import * as userService from '../services/users.js';
import fs from 'fs'; 

const CAMINHO_ARQUIVO = './data/db.json';

let bancoDeUsuarios = [];
if (fs.existsSync(CAMINHO_ARQUIVO)) {
    const dadosArquivo = fs.readFileSync(CAMINHO_ARQUIVO, 'utf-8');
    bancoDeUsuarios = JSON.parse(dadosArquivo);
} else {
    fs.mkdirSync('./data', { recursive: true });
    bancoDeUsuarios = [{ id: 1, name: 'Diego', email: 'diego@email.com' }];
    fs.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(bancoDeUsuarios, null, 2));
}

const salvarNoArquivo = () => {
    fs.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(bancoDeUsuarios, null, 2));
};



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
  salvarNoArquivo(); 
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
  salvarNoArquivo(); 

  return res.json(resultado.usuarioAtualizado);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const listaAtualizada = userService.remove(bancoDeUsuarios, id);

  if (!listaAtualizada) {
    return res.status(404).json({ erro: 'Usuário não encontrado.' });
  }

  bancoDeUsuarios = listaAtualizada;
  salvarNoArquivo(); 
  return res.status(204).send();
};
