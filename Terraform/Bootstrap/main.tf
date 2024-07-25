locals {
  account-id     = "179530787873"
  full-repo-path = "nonrel-key-value/nonrel-key-value"
}

provider "aws" {
  region = "eu-west-1"

  default_tags {
    tags = {
      "owner"         = "karl.etsebeth@bbd.co.za"
      "created-using" = "terraform"
    }
  }
}

resource "aws_s3_bucket" "terraform_state" {
  bucket        = "${local.account-id}-state"
  force_destroy = true
}

resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_dynamodb_table" "terraform_state_lock" {
  name           = "${local.account-id}-state"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}

data "tls_certificate" "githubActions" {
  url = "https://token.actions.githubusercontent.com"
}

resource "aws_iam_openid_connect_provider" "githubActions" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = distinct(concat(data.tls_certificate.githubActions.certificates[*].sha1_fingerprint))
}

resource "aws_iam_role" "githubActions" {
  name                 = "GithubRunner"
  assume_role_policy   = local.trust_policy
  managed_policy_arns  = ["arn:aws:iam::aws:policy/AdministratorAccess"]
  max_session_duration = 3600
}

output "githubActionsRole" {
  value = aws_iam_role.githubActions.arn
}

locals {
  trust_policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Effect" : "Allow",
          "Principal" : {
            "Federated" : "arn:aws:iam::${local.account-id}:oidc-provider/token.actions.githubusercontent.com"
          },
          "Action" : "sts:AssumeRoleWithWebIdentity",
          "Condition" : {
            "StringEquals" : {
              "token.actions.githubusercontent.com:aud" : "sts.amazonaws.com"
            },
            "StringLike" : {
              "token.actions.githubusercontent.com:sub" : "repo:${local.full-repo-path}:*"
            }
          }
        }
      ]
    }
  )
}
