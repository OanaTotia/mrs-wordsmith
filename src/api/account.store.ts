import type { Account } from "./account.model.js";

const accounts = new Map<string, Account>();

export function createAccount(
  data: Omit<Account, "id" | "createdAt">
): Account {
  const id = crypto.randomUUID();
  const account: Account = { id, createdAt: new Date(), ...data };
  accounts.set(id, account);
  return account;
}

export function getAccount(id: string): Account | undefined {
  return accounts.get(id);
}

export function getAllAccounts(): Account[] {
  return [...accounts.values()];
}

export function updateAccount(
  id: string,
  updates: Partial<Omit<Account, "id" | "createdAt">>
): Account | undefined {
  const account = accounts.get(id);
  if (!account) return undefined;

  const updated = { ...account, ...updates };
  accounts.set(id, updated);
  return updated;
}

export function deleteAccount(id: string): boolean {
  return accounts.delete(id);
}
