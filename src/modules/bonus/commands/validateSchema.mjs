import z from "zod"

const createBonus = z.object({
  employeeId: z.number().min(0),
  month: z.enum(['1', '2','3','4','5','6','7','8','9','10','11','12']),
  amount: z.number(),
  descrition: z.string().optional().nullable()
})

export const CommandSchema = {
  create: z.object({
    body: createBonus
  }),
}