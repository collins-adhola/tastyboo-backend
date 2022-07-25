import customersDAO from "../dao/customersDAO.js";

export default class CustomersController {
  static async apiGetCustomers(req, res, next) {
    console.log(req.query.name);

    const customersPerPage = req.query.customersPerPage
      ? parseInt(req.query.customersPerPage)
      : 20;

    const page = req.query.page ? parseInt(req.query.page) : 0;

    let filters = {};
    if (req.query.username) {
      filters.username = req.query.username;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { customersList, totalNumCustomers } =
      await customersDAO.getCustomers({ filters, page, customersPerPage });

    let response = {
      customers: customersList,
      page: page,
      filters: filters,
      entries_per_page: customersPerPage,
      total_results: totalNumCustomers,
    };
    res.json(response);
  }
}
