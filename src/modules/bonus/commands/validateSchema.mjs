import z from "zod"

const createBonus = z.object({
  employeeId: z.number().min(0),
  month: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && val === date.toISOString();
    }, {
    message: "Harus dalam format ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)",
  }).transform((val) => new Date(val)),
  amount: z.number(),
  descrition: z.string().optional().nullable()
})

const deleteBonus = z.object({
  id: z.coerce.number().min(0)
})

export const CommandSchema = {
  create: z.object({
    body: createBonus
  }),
  destroy: z.object({
    body: deleteBonus
  }),
  update: z.object({
    body: createBonus,
    params: deleteBonus
  })
}