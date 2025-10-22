import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } else if (req.method === "POST") {
      const { name, age, email } = req.body;
      const user = await prisma.user.create({ data: { name, age, email } });
      res.status(201).json(user);
    } else if (req.method === "DELETE") {
      const { id } = req.query;
      await prisma.user.delete({ where: { id } });
      res.status(200).json({ message: "Usuário deletado" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
}
