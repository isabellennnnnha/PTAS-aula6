// Funções puras para gerenciar o estado dos usuários

export const findAll = (listaUsuarios) => {
  return [...listaUsuarios];
};

export const findById = (listaUsuarios, idBuscado) => {
  return listaUsuarios.find(usuario => usuario.id === Number(idBuscado)) || null;
};

export const create = (listaUsuarios, novosDados) => {
  const novoId = listaUsuarios.length > 0 ? Math.max(...listaUsuarios.map(u => u.id)) + 1 : 1;
  const novoUsuario = { id: novoId, ...novosDados };
  
  return {
    novoUsuario,
    listaAtualizada: [...listaUsuarios, novoUsuario]
  };
};

export const update = (listaUsuarios, idBuscado, dadosAtualizados) => {
  const alvoId = Number(idBuscado);
  const usuarioExiste = listaUsuarios.some(usuario => usuario.id === alvoId);
  
  if (!usuarioExiste) return null;

  const listaAtualizada = listaUsuarios.map(usuario => 
    usuario.id === alvoId ? { ...usuario, ...dadosAtualizados, id: alvoId } : usuario
  );
  
  return {
    usuarioAtualizado: listaAtualizada.find(usuario => usuario.id === alvoId),
    listaAtualizada
  };
};

export const remove = (listaUsuarios, idBuscado) => {
  const alvoId = Number(idBuscado);
  const usuarioExiste = listaUsuarios.some(usuario => usuario.id === alvoId);

  if (!usuarioExiste) return null;

  return listaUsuarios.filter(usuario => usuario.id !== alvoId);
};
