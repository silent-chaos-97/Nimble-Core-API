// replace with actual data integration/api calls


const get = productName => {
  const getters = {
    uniform_residential_loan_application: () => mockUniformResidentialLoanApplication
  }
  return getters[productName]()
