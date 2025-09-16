import { v4 as uuidv4} from "uuid";

export const userFactory = (overrides: Partial<{name: string; email: string, accountType: string}> = {}) => {
    const id = uuidv4();
    return {
        id,
        name: overrides.name ?? `User-${id.slice(0, 6)}`,
        email: overrides.email ?? `user-${id.slice(0, 6)}@example.com`,
        accountType: overrides.accountType ?? "standard"
    };
};

export const transactionFactory = (overrides: Partial<{userId: string; amount: number, type: string, recipientId: string}> = {}) => {
    const id = uuidv4();
    return {
        userId: overrides.userId ?? uuidv4,
        name: overrides.amount ?? Number((Math.random() * 1000).toFixed(2)),
        email: overrides.type ?? "transfer",
        recipientId: overrides.recipientId ?? uuidv4()
    };
};