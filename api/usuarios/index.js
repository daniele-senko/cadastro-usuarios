import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Listar usuários
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    }

    if (req.method === "POST") {
      // Criar usuário
      const { name, email, age } = req.body;
      const newUser = await prisma.user.create({
        data: { name, email, age },
      });
      return res.status(201).json(newUser);
    }

    return res.status(405).json({ error: "Método não permitido" });
  } catch (error) {
    console.error("Erro na rota /api/usuarios:", error);
    return res.status(500).json({ error: "Erro ao acessar usuários" });
  }
}
