import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { name, email, age } = req.query;
      const users = await prisma.user.findMany({
        where: {
          ...(name && { name }),
          ...(email && { email }),
          ...(age && { age }),
        },
      });
      res.status(200).json(users);

    } else if (req.method === "POST") {
      const { email, name, age } = req.body;
      const newUser = await prisma.user.create({ data: { email, name, age } });
      res.status(201).json(newUser);

    } else if (req.method === "PUT") {
      const { id } = req.query;
      const { email, name, age } = req.body;
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { email, name, age },
      });
      res.status(200).json(updatedUser);

    } else if (req.method === "DELETE") {
      const { id } = req.query;
      await prisma.user.delete({ where: { id } });
      res.status(200).json({ message: "Usuário deletado com sucesso!" });

    } else {
      res.setHeader("Allow", ["GET","POST","PUT","DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Erro na API:", error);
    res.status(500).json({ error: "Erro na API" });
  }
}
