import z from "zod"

const createEmployee = z.object({
  name: z.string(),
  email: z.string().email(),
  position: z.string(),
  baseSalary: z.number().min(0)
})

const updateEmployee = z.object({
  name: z.string().optional().default(null),
  email: z.string().optional().default(null),
  position: z.string().default(null),
  baseSalary: z.number().default(null)
})

const userId = z.object({
  id: z.string()
})

export const CommandSchema = {
  create: z.object({
    body: createEmployee
  }),
  update: z.object({
    body: updateEmployee,
    params: userId
  }),
  delete: z.object({
    params: userId
  })
}