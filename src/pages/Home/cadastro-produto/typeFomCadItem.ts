import { z } from "zod";

export type cadItemInitialValue = {
  nome: string;
};

export const SchemaCadItem = z.object({
  nome: z.string().min(3).max(20),
});

export type item = z.infer<typeof SchemaCadItem>;

export type initialValueEditItem = {
  id: number;
  nameItem: string;
};

export const SchemaEditItem = z.object({
  id: z.number().min(1),
  nameItem: z.string().min(2),
});

export type editItem = z.infer<typeof SchemaEditItem>;
