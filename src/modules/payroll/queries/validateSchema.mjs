import z from "zod"

const getPayroll = z.object({
  page: z.coerce.number().min(1).default(1),
  size: z.coerce.number().min(0).default(10),
})

export const QuerySchema = {
  list: z.object({
    query: getPayroll
  })
}