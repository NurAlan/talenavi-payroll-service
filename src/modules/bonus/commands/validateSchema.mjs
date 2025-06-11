import z from "zod"

const createBonus = z.object({
  employeeId: z.number().min(0),
  month: z.number().int().min(1).max(12),
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