import z from "zod"

const registerUser = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
  role: z.enum(['admin', 'employee']).optional().default('employee')
}).refine((data) => data.password == data.confirmPassword, {
  message: 'confirmPassword must be same with password',
  path: ['confirmPassword']
})

export const UserSchema = {
  register: z.object({
    body: registerUser
  })
}