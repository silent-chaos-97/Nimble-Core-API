module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  name = "nimble_core_vpc"
  cidr = "10.0.0.0/16"
