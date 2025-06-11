import z from "zod"

const createBonus = z.object({
  employeeId: z.number().min(0),
  month: z.enum(['1', '2','3','4','5','6','7','8','9','10','11','12']),
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