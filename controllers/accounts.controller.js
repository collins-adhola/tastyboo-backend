import AccountssDAO from "../dao/accountsDAO.js";

export default class AccountsController {
  static async apiGetAccounts(req, res, next) {
    const accountsPerPage = req.query.accountsPerPage
      ? parseInt(req.query.accountsPerPage)
      : 20;

    const page = req.query.page ? parseInt(req.query.page) : 0;

    let filters = {};
    if (req.query.account_id) {
      filters.account_id = req.query.account_id;
    } else if (req.query.products) {
      filters.name = req.query.products;
    }

    const { accountsList, totalNumAccounts } = await AccountssDAO.getAccounts({
      filters,
      page,
      accountsPerPage,
    });

    let response = {
      accounts: accountsList,
      page: page,
      filters: filters,
      entries_per_page: accountsPerPage,
      total_results: totalNumAccounts,
    };
    res.json(response);
  }
}
