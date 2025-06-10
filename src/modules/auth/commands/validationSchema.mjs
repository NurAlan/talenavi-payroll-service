import z from "zod"

const loginReq = z.object({
  email: z.string(),
  password: z.string()
})

export const AuthSchema = {
  login: z.object({
    body: loginReq
  })
}


