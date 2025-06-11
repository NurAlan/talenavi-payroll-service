import z from "zod"

const createPayroll = z.object({
  employeeId: z.number().min(0),
  month: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && val === date.toISOString();
    }, {
      message: "Harus dalam format ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)",
    }).transform((val) => new Date(val))
  })

export const CommandSchema = {
  create: z.object({
    body: createPayroll
  })
}