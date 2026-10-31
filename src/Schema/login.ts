import  z from 'zod'

 export const loginSchema = z.object({
    email:z.string().email("invalid email"),
    password:z.string().regex( /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,"Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character.",),
    
})