const accounts = new Map();
export function createAccount(data) {
    const id = crypto.randomUUID();
    const account = { id, createdAt: new Date(), ...data };
    accounts.set(id, account);
    return account;
}
export function getAccount(id) {
    return accounts.get(id);
}
export function getAllAccounts() {
    return [...accounts.values()];
}
export function updateAccount(id, updates) {
    const account = accounts.get(id);
    if (!account)
        return undefined;
    const updated = { ...account, ...updates };
    accounts.set(id, updated);
    return updated;
}
export function deleteAccount(id) {
    return accounts.delete(id);
}
//# sourceMappingURL=account.store.js.map