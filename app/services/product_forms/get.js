// replace with actual data integration/api calls

const { mockUniformResidentialLoanApplication } = require("../../models/product_forms/uniform_residential_loan")

  const getters = {
    uniform_residential_loan_application: () => mockUniformResidentialLoanApplication
  }
  return getters[productName]()
}
