import { invoicesDB, customersDB, bankInfoDB } from ".";
import { invoicesTable, customersTable, bankInfoTable } from './schema';
import { desc, eq } from "drizzle-orm";

//👇🏻 add a new row to the invoices table
export const createInvoice = async (invoice: any) => {
    await invoicesDB.insert(invoicesTable).values({
    owner_id: invoice.user_id,
    customer_id: invoice.customer_id,
    title: invoice.title,
    items: invoice.items,
    total_amount: invoice.total_amount,
 });
};

//👇🏻 get all user's invoices
export const getUserInvoices = async (user_id: string) => {
    return await invoicesDB.select().from(invoicesTable).where(eq(invoicesTable.owner_id, user_id)).orderBy(desc(invoicesTable.created_at));
};

//👇🏻 get single invoice
export const getSingleInvoice = async (id: number) => {
    return await invoicesDB.select().from(invoicesTable).where(eq(invoicesTable.id, id));
};