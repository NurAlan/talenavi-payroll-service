import z from "zod"

const createPayroll = z.object({
  employeeId: z.number().min(0),
  month: z.number().int().min(1).max(12)
})

export const CommandSchema = {
  create: z.object({
    body: createPayroll
  })
}