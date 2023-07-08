terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.7"
    }
  }
}

provider "aws" {
  region     = "us-east-1"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

locals {
  project_name = "Blog"
  repo = "https://github.com/asungy/blog"
  branch = "2-set-up-terraform"
}

resource "aws_amplify_app" "app" {
  name = local.project_name
  repository = local.repo
  access_token = var.github_pat
}

resource "aws_amplify_branch" "branch" {
  app_id = aws_amplify_app.app.id
  branch_name = local.branch
  framework = "Next"
  stage = "PULL_REQUEST"
}
