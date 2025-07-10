terraform {
  required_providers {
    aws = {
      version = "3.74.1"
    }
  }
}

provider "aws" {
  profile = "default"
