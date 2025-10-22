import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    }

    if (req.method === "POST") {
      const { name, email, age } = req.body;
      const newUser = await prisma.user.create({
        data: { name, email, age: Number(age) },
      });
      return res.status(201).json(newUser);
    }

    if (req.method === "PUT") {
      const { id, name, email, age } = req.body;
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email, age: Number(age) },
      });
      return res.status(200).json(updatedUser);
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      await prisma.user.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    }

    return res.status(405).json({ error: "Method not allowed" });

  } catch (error) {
    console.error("Erro ao acessar usuários:", error);
    return res.status(500).json({ error: "Erro ao acessar usuários" });
  }
}
