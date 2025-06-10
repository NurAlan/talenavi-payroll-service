import z from "zod"

const createAdmin = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
  role: z.enum(['admin', 'employee'])
}).refine((data) => data.password == data.confirmPassword, {
  message: 'confirmPassword must be same with password',
  path: ['confirmPassword']
})

export const AdminSchema = {
  create: z.object({
    body: createAdmin
  })
}