let accounts;

export default class AccountsDAO {
  static async injectDB(conn) {
    //exported class contains async mtd wc injectDB. injectDB is called as soon as server starts and provides the database reference to customers
    if (accounts) {
      return;
    }
    try {
      accounts = await conn.db(process.env.TASTYBOO_NS).collection("accounts");
    } catch (e) {
      console.error(`unable to connect in AccountsDAO: ${e}`);
    }
  }

  static async getAccounts({
    // default filter
    filters = [],
    page = 0,
    accountsPerPage = 20, //will only get 20 customer details at a time
  } = {}) {
    let query;
    if (filters) {
      if ("account_id " in filters) {
        query = { $text: { $search: filters["account_id"] } };
      } else if ("products" in filters) {
        query = { $text: { $search: filters["products"] } };
      }
    }
    let cursor;
    try {
      cursor = await accounts
        .find(query)
        .limit(accountsPerPage)
        .skip(accountsPerPage * page);
      const accountsList = await cursor.toArray();
      const totalNumAccounts = await accounts.countDocuments(query);
      return { accountsList, totalNumAccounts };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { accountsList: [], totalNumAccounts: 0 };
    }
  }
}

// Retrieve accounts from the database
