import z from "zod"

const createEmployee = z.object({
  userId: z.number().min(1),
  position: z.string(),
  baseSalary: z.number().min(0)
})

export const CommandSchema = {
  create: z.object({
    body: createEmployee
  })
}