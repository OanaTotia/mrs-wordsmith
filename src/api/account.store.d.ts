import type { Account } from "./account.model.js";
export declare function createAccount(data: Omit<Account, "id" | "createdAt">): Account;
export declare function getAccount(id: string): Account | undefined;
export declare function getAllAccounts(): Account[];
export declare function updateAccount(id: string, updates: Partial<Omit<Account, "id" | "createdAt">>): Account | undefined;
export declare function deleteAccount(id: string): boolean;
//# sourceMappingURL=account.store.d.ts.map