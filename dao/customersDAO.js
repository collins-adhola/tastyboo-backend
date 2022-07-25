let customers;

export default class CustomersDAO {
  static async injectDB(conn) {
    //exported class contains async mtd wc injectDB. injectDB is called as soon as server starts and provides the database reference to customers
    if (customers) {
      return;
    }
    try {
      customers = await conn
        .db(process.env.TASTYBOO_NS)
        .collection("customers");
    } catch (e) {
      console.error(`unable to connect in CustomersDAO: ${e}`);
    }
  }

  static async getCustomers({
    // default filter
    filters = null,
    page = 0,
    customersPerPage = 20, //will only get 20 customer details at a time
  } = {}) {
    let query;
    if (filters) {
      if ("name " in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("username" in filters) {
        query = { $text: { $search: filters["username"] } };
      }
    }
    let cursor;
    try {
      cursor = await customers
        .find(query)
        .limit(customersPerPage)
        .skip(customersPerPage * page);
      const customersList = await cursor.toArray();
      const totalNumCustomers = await customers.countDocuments(query);
      return { customersList, totalNumCustomers };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { customersList: [], totalNumCustomers: 0 };
    }
  }
}
