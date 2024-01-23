import zod from "zod";

export const searcherSchema = zod.object({
  search: zod
    .string({})
    .trim()
    .min(1, "Debe ingresar al menos un caracter")
    .max(10, "Debe ingresar menos de 10 caracteres"),
});
