const Joi = require('@hapi/joi')
const _ = require('lodash')

const app = require('../core')
const BaseModel = require('./model')

class AccountRequest extends BaseModel {
  constructor(data) {
    super(AccountRequest.props(), AccountRequest.relations(), data)
  }

  static props() {
    return [
      'id',
      'status',
      'institutionId',
      'branchId',
      'bsaScore',
      'bsaRisk',
      'createdById',
      'createdAt',
      'productConfigurations',
      'referrers', // FIXME: exists for backward compatability
      'referredById',
      'statusUpdatedAt',
      'statusEmailSubject',
      'statusEmailBody',
      'contractDocumentId',
      'contractDocumentEnvelopeId',
      'contractDocumentCreatedAt',
      'contractDocumentEnvelopeStatus',
      'contractDocumentEnvelopeStatusUpdatedAt'
    ]
  }

  static relations() {
    return ['signers', 'referredBy', 'statusUpdatedBy', 'productConfigurations', 'productOptions', 'branch']
  }

  data() {
    const SignerModel = app.models.signer
    const UserModel = app.models.user
    const InstitutionBranchModel = app.models.institutionBranch
    const signers = this._data.signers.map(signerData => new SignerModel(signerData).data())

    return {
      ..._.omit(this._data, [
        'signers',
        'referredBy',
        'statusUpdatedBy',
        'verificationStatus',
        'productConfigurations',
        'productOptions',
        'branch'
      ]),
      signers: signers,
      verificationStatus: AccountRequest.getVerificationStatus(signers),
      referredBy: this._data.referredBy ? new UserModel(this._data.referredBy).data() : null,
      statusUpdatedBy: this._data.statusUpdatedBy ? new UserModel(this._data.statusUpdatedBy).data() : null,
      productConfigurations: this.mapProductConfigurations(),
      branch: this._data.branch ? new InstitutionBranchModel(this._data.branch).data() : null
    }
  }

  mapProductConfigurations() {
    if (!_.has(this._data, 'productConfigurations')) {
      return []
    }

    const AccountRequestProduct = app.models.accountRequestProduct
    const ProductOption = app.models.productOption

    return this._data.productConfigurations.map(obj => {
      // filter relevant options for this product
      const options = _.get(this._data, 'productOptions', [])
        .filter(po => po.productId === obj.productId)
        .map(po => new ProductOption(po).data())
      // assign that to the product
      obj.product.options = options

      // build sub model
      return new AccountRequestProduct(obj).data()
    })
  }


  static status() {
    return _.keys({
      DRAFT: ['referral'],
      INCOMPLETE: [''],
      PENDING: ['Ready to Sign'],
