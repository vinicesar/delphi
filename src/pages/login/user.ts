import { z } from "zod";

export const SchemaUser = z.object({
  login: z.string().min(3).max(20),
  senha: z.string().min(3).max(20),
});

export type user = z.infer<typeof SchemaUser>;

export type userInitialValue = {
  login: string;
  senha: string;
};



export const SchemaCadastro = z
  .object({
    nome: z.string().min(3).max(13),
    login: z.string().min(3).max(20),
    senha: z.string().min(3).max(20),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "Senhas não conferem",
    path: ["confirmarSenha"],
  });

export type cadastro = z.infer<typeof SchemaCadastro>;

export type cadastroInitialValue = {
  nome: string;
  login: string;
  senha: string;
  confirmarSenha: string;
};
