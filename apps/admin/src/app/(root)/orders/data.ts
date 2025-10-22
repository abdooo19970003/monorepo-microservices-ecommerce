import { auth } from "@clerk/nextjs/server"
import { OrderType } from "@repo/types"

export type Payment = {
  id: string
  amount: number
  fullName: string
  status: "pending" | "processing" | "success" | "failed"
  userId: string
  email: string
}
export const paymentsData: Payment[] = [
  { "id": "a1b2c3d4", "amount": 250, "status": "success", "email": "amelia.brooks@gmail.com", "fullName": "Amelia Brooks", "userId": "217f2227" },
  { "id": "e5f6g7h8", "amount": 120, "status": "pending", "email": "liam.martin@yahoo.com", "fullName": "Liam Martin", "userId": "d1b6862d" },
  { "id": "i9j0k1l2", "amount": 430, "status": "failed", "email": "olivia.james@outlook.com", "fullName": "Olivia James", "userId": "0ad2b904" },
  { "id": "m3n4o5p6", "amount": 310, "status": "processing", "email": "noah.thompson@gmail.com", "fullName": "Noah Thompson", "userId": "f4f0af7a" },
  { "id": "q7r8s9t0", "amount": 85, "status": "success", "email": "emma.davis@icloud.com", "fullName": "Emma Davis", "userId": "6307bd3c" },
  { "id": "u1v2w3x4", "amount": 600, "status": "pending", "email": "jackson.lee@gmail.com", "fullName": "Jackson Lee", "userId": "a88c4c47" },
  { "id": "y5z6a7b8", "amount": 150, "status": "failed", "email": "ava.hughes@yahoo.com", "fullName": "Ava Hughes", "userId": "33e450c5" },
  { "id": "c9d0e1f2", "amount": 720, "status": "processing", "email": "elijah.morris@outlook.com", "fullName": "Elijah Morris", "userId": "a13361c7" },
  { "id": "g3h4i5j6", "amount": 90, "status": "success", "email": "mia.clark@gmail.com", "fullName": "Mia Clark", "userId": "509c1fc8" },
  { "id": "k7l8m9n0", "amount": 510, "status": "pending", "email": "lucas.walker@icloud.com", "fullName": "Lucas Walker", "userId": "7a270fd8" },
  { "id": "o1p2q3r4", "amount": 330, "status": "failed", "email": "sophia.green@gmail.com", "fullName": "Sophia Green", "userId": "d276a362" },
  { "id": "s5t6u7v8", "amount": 275, "status": "processing", "email": "benjamin.hall@yahoo.com", "fullName": "Benjamin Hall", "userId": "489d9acc" },
  { "id": "w9x0y1z2", "amount": 180, "status": "success", "email": "isabella.adams@outlook.com", "fullName": "Isabella Adams", "userId": "d1c61ea3" },
  { "id": "a3b4c5d6", "amount": 640, "status": "pending", "email": "henry.baker@gmail.com", "fullName": "Henry Baker", "userId": "51439811" },
  { "id": "e7f8g9h0", "amount": 95, "status": "failed", "email": "charlotte.wood@icloud.com", "fullName": "Charlotte Wood", "userId": "5bd30f31" },
  { "id": "i1j2k3l4", "amount": 400, "status": "processing", "email": "sebastian.wright@yahoo.com", "fullName": "Sebastian Wright", "userId": "d434f1d2" },
  { "id": "m5n6o7p8", "amount": 220, "status": "success", "email": "harper.evans@gmail.com", "fullName": "Harper Evans", "userId": "619d177b" },
  { "id": "q9r0s1t2", "amount": 560, "status": "pending", "email": "grayson.king@outlook.com", "fullName": "Grayson King", "userId": "d86f5a36" },
  { "id": "u3v4w5x6", "amount": 130, "status": "failed", "email": "ella.scott@gmail.com", "fullName": "Ella Scott", "userId": "b4cf475a" },
  { "id": "y7z8a9b0", "amount": 710, "status": "processing", "email": "levi.young@yahoo.com", "fullName": "Levi Young", "userId": "3d460408" },
  { "id": "c1d2e3f4", "amount": 105, "status": "success", "email": "scarlett.hill@icloud.com", "fullName": "Scarlett Hill", "userId": "a56bba80" },
  { "id": "g5h6i7j8", "amount": 480, "status": "pending", "email": "daniel.ward@gmail.com", "fullName": "Daniel Ward", "userId": "401d19b2" },
  { "id": "k9l0m1n2", "amount": 350, "status": "failed", "email": "victoria.bennett@outlook.com", "fullName": "Victoria Bennett", "userId": "37a6bd7f" },
  { "id": "o3p4q5r6", "amount": 290, "status": "processing", "email": "matthew.cox@yahoo.com", "fullName": "Matthew Cox", "userId": "2cc048c8" },
  { "id": "s7t8u9v0", "amount": 160, "status": "success", "email": "nora.richards@gmail.com", "fullName": "Nora Richards", "userId": "1b147740" },
  { "id": "w1x2y3z4", "amount": 670, "status": "pending", "email": "julian.foster@icloud.com", "fullName": "Julian Foster", "userId": "f4cb35e3" },
  { "id": "a5b6c7d8", "amount": 110, "status": "failed", "email": "zoe.hamilton@outlook.com", "fullName": "Zoe Hamilton", "userId": "a5e2613c" },
  { "id": "e9f0g1h2", "amount": 390, "status": "processing", "email": "nathan.perry@gmail.com", "fullName": "Nathan Perry", "userId": "5d389a25" },
  { "id": "i3j4k5l6", "amount": 240, "status": "success", "email": "aurora.henderson@yahoo.com", "fullName": "Aurora Henderson", "userId": "bc04b509" },
  { "id": "m7n8o9p0", "amount": 580, "status": "pending", "email": "isaac.reed@outlook.com", "fullName": "Isaac Reed", "userId": "55d10150" },
  { "id": "q1r2s3t4", "amount": 140, "status": "failed", "email": "madeline.bryant@gmail.com", "fullName": "Madeline Bryant", "userId": "25f27812" },
  { "id": "u5v6w7x8", "amount": 730, "status": "processing", "email": "caleb.hayes@icloud.com", "fullName": "Caleb Hayes", "userId": "390fd404" },
  { "id": "y9z0a1b2", "amount": 115, "status": "success", "email": "penelope.russell@yahoo.com", "fullName": "Penelope Russell", "userId": "3a91d214" },
  { "id": "c3d4e5f6", "amount": 460, "status": "pending", "email": "theodore.barnes@gmail.com", "fullName": "Theodore Barnes", "userId": "1a98581b" },
  { "id": "g7h8i9j0", "amount": 370, "status": "failed", "email": "hazel.hart@outlook.com", "fullName": "Hazel Hart", "userId": "76e88818" },
  { "id": "k1l2m3n4", "amount": 310, "status": "processing", "email": "christian.mcdonald@yahoo.com", "fullName": "Christian McDonald", "userId": "e1c9cc08" },
  { "id": "o5p6q7r8", "amount": 170, "status": "success", "email": "stella.franklin@gmail.com", "fullName": "Stella Franklin", "userId": "2af0250d" },
  { "id": "s9t0u1v2", "amount": 690, "status": "pending", "email": "aiden.manning@icloud.com", "fullName": "Aiden Manning", "userId": "b34afd06" },
  { "id": "w3x4y5z6", "amount": 125, "status": "failed", "email": "paisley.holland@outlook.com", "fullName": "Paisley Holland", "userId": "e49bc6eb" },
  { "id": "a7b8c9d0", "amount": 420, "status": "processing", "email": "ezra.matthews@gmail.com", "fullName": "Ezra Matthews", "userId": "e90fec67" },
  { "id": "e1f2g3h4", "amount": 260, "status": "success", "email": "violet.manning@yahoo.com", "fullName": "Violet Manning", "userId": "ddf54647" },
  { "id": "i5j6k7l8", "amount": 590, "status": "pending", "email": "connor.bishop@outlook.com", "fullName": "Connor Bishop", "userId": "9be00970" },
]

export const getData = async (): Promise<OrderType[]> => {
  try {
    const { getToken } = await auth()
    const token = await getToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(`Error Fetching Orders Data`, error);
    return [];


  }
}
