import z from "zod"

export interface CustomJwtSessionClaims {
  metadata: {
    role?: "admin" | "user"
  }
}
export const newUserFormSchema = z.object({
  firstName: z.string().min(3, "First Name is Required").max(50),
  lastName: z.string().min(3, "Last Name is Required").max(50),
  username: z.string().min(3, "username is Required").max(50),
  emailAddress: z.array(z.email()).length(1, "Email is Required"),
  phoneNumbers: z.array(z.string()),
  password: z.string().min(8).max(50),
})
export type NewUserFormType = z.infer<typeof newUserFormSchema>
