import { z } from "zod";

export const SchemaCartItens = z.object({
  quantidade: z.number().min(1),
  nameItem: z.string().min(2),
});

export type typeCart = z.infer<typeof SchemaCartItens>;

export type initialValueCart = {
  quantidade: number;
  nameItem: string;
};
