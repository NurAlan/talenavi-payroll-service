import z from "zod"

const get = z.object({
  page: z.coerce.number().optional().default(1),
  size: z.coerce.number().optional().default(10),
  search: z.string().optional().default('')
})

export const QuerySchema = {
  list: z.object({
    query: get
  })
}