import { BaseSecureStorage } from '@src/storage/persistence/BaseSecureStorage';
import type { AccountModel } from '@src/storage/models/AccountModel';

export class AccountSecureStorage extends BaseSecureStorage {
    /** ACCOUNTS DB KEY **/
    static ACCOUNTS_KEY = 'ACCOUNTS';

    /**
     * Creates a new account
     * @returns {Promise<AccountModel>}
     * @param account
     */
    static async createNewAccount(account: AccountModel): Promise<AccountModel> {
        const accounts = await this.getAllAccounts();
        accounts.push(account);
        return this.secureSaveAsync(this.ACCOUNTS_KEY, JSON.stringify(accounts));
    }

    /**
     * Get all the accounts
     * @returns {Promise<AccountModel[]>}
     */
    static async getAllAccounts(): Promise<AccountModel[]> {
        const accountsString = await this.secureRetrieveAsync(this.ACCOUNTS_KEY);
        try {
            return JSON.parse(accountsString) || [];
        } catch (e) {
            return [];
        }
    }

    /**
     * Get all the accounts
     * @returns {Promise<AccountModel[]>}
     */
    static async getAccountById(id: number): Promise<AccountModel | null> {
        const accountsString = await this.secureRetrieveAsync(this.ACCOUNTS_KEY);
        let accounts;
        try {
            accounts = JSON.parse(accountsString) || [];
        } catch (e) {
            return null;
        }
        return accounts.find(account => account.id === id);
    }

    /**
     * Clear all keys
     * @returns {Promise<string | null>}
     */
    static clear() {
        return this.removeKey(this.ACCOUNTS_KEY);
    }
}