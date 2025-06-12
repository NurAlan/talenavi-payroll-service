import z from "zod"

const isoDateString = z.string().refine((val) => {
  const date = new Date(val)
  return !isNaN(date.getTime()) && val === date.toISOString()
}, {
  message: "Harus dalam format ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)",
})

const getAttendance = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  size: z.coerce.number().min(1).optional().default(10),
  startDate: isoDateString.optional().transform((val) => val ? new Date(val) : undefined),
  endDate: isoDateString.optional().transform((val) => val ? new Date(val) : undefined),
}).refine((data) => {
  if (data.startDate && !data.endDate) return false
  return true
}, {
  message: "endDate wajib jika startDate diisi",
  path: ['endDate']
}).refine((data) => {
  if (data.startDate && data.endDate) {
    return data.endDate >= data.startDate
  }
  return true
}, {
  message: "endDate tidak boleh lebih kecil dari startDate",
  path: ['endDate']
})


export const QuerySchema = {
  list: z.object({
    query: getAttendance
  }),
}