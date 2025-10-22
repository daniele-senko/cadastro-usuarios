import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/bxs-trash-alt.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  // Buscar usuários
  async function getUsers() {
    try {
      const response = await api.get("/");
      const data = Array.isArray(response.data) ? response.data : [];
      setUsers(data);
      console.log("Usuários recebidos:", data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setUsers([]);
    }
  }

  // Criar usuário
  async function createUsers() {
    if (!inputName.current.value) return alert("Nome não pode ser vazio");
    if (!inputAge.current.value || isNaN(inputAge.current.value))
      return alert("Idade inválida");
    if (!/\S+@\S+\.\S+/.test(inputEmail.current.value))
      return alert("Email inválido");

    try {
      await api.post("/", {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value,
      });
      inputName.current.value = "";
      inputAge.current.value = "";
      inputEmail.current.value = "";
      getUsers();
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      alert("Falha ao criar usuário");
    }
  }

  // Deletar usuário
  async function deleteUsers(id) {
    try {
      await api.delete(`/${id}`);
      getUsers();
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
      alert("Falha ao deletar usuário");
    }
  }

  // Abrir modal de edição
  function handleEdit(user) {
    setEditingUser({ ...user }); // cria cópia para edição
  }

  // Salvar alterações
  async function updateUser() {
    if (!editingUser.name) return alert("Nome não pode ser vazio");
    if (!editingUser.age || isNaN(editingUser.age)) return alert("Idade inválida");
    if (!/\S+@\S+\.\S+/.test(editingUser.email)) return alert("Email inválido");

    try {
      await api.put(`/${editingUser.id}`, {
        name: editingUser.name,
        age: editingUser.age,
        email: editingUser.email,
      });
      setEditingUser(null);
      getUsers();
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      alert("Falha ao atualizar usuário");
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input name="nome" placeholder="Nome" type="text" ref={inputName} />
        <input name="idade" placeholder="Idade" type="number" ref={inputAge} />
        <input name="email" placeholder="Email" type="email" ref={inputEmail} />
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>

      {Array.isArray(users) &&
        users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>
                Nome: <span>{user.name}</span>
              </p>
              <p>
                Idade: <span>{user.age}</span>
              </p>
              <p>
                Email: <span>{user.email}</span>
              </p>
            </div>
            <div className="card-buttons">
              <button onClick={() => handleEdit(user)}>Editar</button>
              <button onClick={() => deleteUsers(user.id)}>
                <img src={Trash} />
              </button>
            </div>
          </div>
        ))}

      {/* Modal de edição */}
      {editingUser && (
        <div className="modal">
          <h2>Editar Usuário</h2>
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />
          <input
            type="number"
            value={editingUser.age}
            onChange={(e) =>
              setEditingUser({ ...editingUser, age: e.target.value })
            }
          />
          <input
            type="email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
          <button onClick={updateUser}>Salvar</button>
          <button onClick={() => setEditingUser(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default Home;
