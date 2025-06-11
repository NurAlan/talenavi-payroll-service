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

  const downloadPayroll = z.object({
    startMonth: z.string().refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && val === date.toISOString();
      }, {
        message: "Harus dalam format ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)",
    }).transform((val) => new Date(val)),
    endMonth: z.string().refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && val === date.toISOString();
      }, {
        message: "Harus dalam format ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)",
    }).transform((val) => new Date(val))
  }).refine((data) => data.endMonth >= data.startMonth, {
    message: "endMonth tidak boleh lebih kecil dari startMonth",
    path: ['endMonth']
  })

export const CommandSchema = {
  create: z.object({
    body: createPayroll
  }),
  download: z.object({
    body: downloadPayroll
  })
}