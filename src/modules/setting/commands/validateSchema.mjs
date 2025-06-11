import z from "zod"

const createSetting = z.object({
  clockIn: z.string().time(),
  clockOut: z.string().time()
}).refine((data) => data.clockOut > data.clockIn, {
  message: 'clockOut harus lebih besar daripada clockIn',
  path: ['clockOut']
})

export const CommandSchema = {
  create: z.object({
    body: createSetting
  })
}