import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/bxs-trash-alt.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

async function getUsers() {
  try {
    const response = await api.get("/");
    // Fallback: se não for array, usar array vazio
    const data = Array.isArray(response.data) ? response.data : [];
    setUsers(data);
    console.log("Usuários recebidos:", data);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    setUsers([]); // fallback seguro em caso de erro
  }
}

  async function createUsers() {
    await api.post("/", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    getUsers();

    inputName.current.value = "";
    inputAge.current.value = "";
    inputEmail.current.value = "";
  }

  async function deleteUsers(id) {
    await api.delete(`/${id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input name="nome" placeholder="Nome" type="text" ref={inputName} />
        <input name="idade" placeholder="Idade" type="number" ref={inputAge} />
        <input name="email" placeholder="Email" type="email" ref={inputEmail} />
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>

      {Array.isArray(users) && users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
