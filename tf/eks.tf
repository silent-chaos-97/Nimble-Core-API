module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name                   = "nimble_core_cluster"
  cluster_version                = "1.21"
  cluster_endpoint_public_access = true

  cluster_addons = {
    vpc-cni = {
      resolve_conflicts = "OVERWRITE"
    }
  }

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

