import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        // --- Rota GET: Listar todos os usuários ---
        const users = await prisma.user.findMany();
        return res.status(200).json(users);

      case "POST":
        // --- Rota POST: Criar um novo usuário ---
        const { name, email, age } = req.body;
        if (!name || !email || !age) {
          return res.status(400).json({ 
            error: "Dados incompletos. Nome, email e idade são obrigatórios." 
          });
        }
        
        try {
          const newUser = await prisma.user.create({
            data: { name, email, age },
          });
          return res.status(201).json(newUser);

        } catch (prismaError) {
          if (prismaError.code === 'P2002') {
            return res.status(409).json({ error: "Email já cadastrado." });
          }

          throw prismaError;
        }

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({ error: `Método ${method} não permitido` });
    }
  } catch (error) {

    console.error(`Erro na rota /api (index.js) [${method}]:`, error.message);
    
    return res.status(500).json({ 
      error: "Erro interno do servidor. Não foi possível processar a solicitação.",
      details: error.message 
    });
  }
}