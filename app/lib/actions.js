// Mark all the exported functions within the file as server functions
// These server functions can then be imported into Client and Server components
"use server";
import { sql } from "@vercel/postgres";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

export async function createInvoice(formData) {
  const customerId = formData.get("customerId");
  const amount = formData.get("amount");
  const status = formData.get("status");

  console.log(customerId, amount, status);

  // Validate... (e.g. https://zod.dev if using TS)

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
`;

  // Clear the client-side router cache
  // revalidatePath("/dashboard/invoices");

  // Redirect
  // redirect("/dashboard/invoices");
}
