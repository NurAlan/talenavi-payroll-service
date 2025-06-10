import z from "zod"

const getUsers = z.object({
  page: z.coerce.number().min(0).optional().default(1),
  size: z.coerce.number().min(0).optional().default(10),
  search: z.string().optional().default('')
})

export const QuerySchema = {
  list: z.object({
    query: getUsers
  })
}