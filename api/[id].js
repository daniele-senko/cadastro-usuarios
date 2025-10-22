import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "PUT") {
      const { name, email, age } = req.body;
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email, age },
      });
      return res.status(200).json(updatedUser);
    }

    if (req.method === "DELETE") {
      await prisma.user.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    }

    return res.status(405).json({ error: "Método não permitido" });
  } catch (error) {
    console.error(`Erro na rota /api/usuarios/${id}:`, error);
    return res.status(500).json({ error: "Erro ao acessar usuário" });
  }
}
