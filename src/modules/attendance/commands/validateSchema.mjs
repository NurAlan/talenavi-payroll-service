import z from "zod"

const checkInEmployee = z.object({
  status: z.enum(['hadir', 'cuti']),
})

export const CommandSchema = {
  checkIn: z.object({
    body: checkInEmployee
  }),
}