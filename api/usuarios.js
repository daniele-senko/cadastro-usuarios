import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }

  if (method === "POST") {
    try {
      const { name, email, age } = req.body;
      const newUser = await prisma.user.create({ data: { name, email, age } });
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  return res.status(405).json({ error: "Método não permitido" });
}
