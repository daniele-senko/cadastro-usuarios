import express from 'express';
import cors from 'cors';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Criar usuário
app.post("/usuarios", async (req, res) => {
  try {
    const { email, name, age } = req.body;

    const newUser = await prisma.user.create({
      data: { email, name, age },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// Listar usuários
app.get("/usuarios", async (req, res) => {
  try {
    const { name, email, age } = req.query;

    let users;

    if (name || email || age) {
      users = await prisma.user.findMany({
        where: {
          ...(name && { name }),
          ...(email && { email }),
          ...(age && { age }),
        },
      });
    } else {
      users = await prisma.user.findMany();
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// Atualizar usuário
app.put("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, age } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { email, name, age },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

// Deletar usuário
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({ where: { id } });

    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API ouvindo na porta ${PORT}`);
});
