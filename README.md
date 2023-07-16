This is a starter template for [Learn Next.js](https://nextjs.org/learn).

# Deployment

This site can be deployed by [Terraform][terraform] on AWS.

## Prerequisites

### Setup State Bucket

### Tooling
The following need to be installed for deployment:
- [AWS CLI][aws_cli_install]
- [Terraform][terraform_install]

## Credentials
In order to deploy to AWS, Terraform needs to be provided with necessary access
keys and tokens to create appropriate resources. The following credentials
needs to be provided:
- AWS access key ID
- AWS secret key
- GitHub personal access token

Access key information can be provided by creating a file called `keys.tf`
(specified by _.gitignore_ to be omitted from commit history):
```terraform
variable "aws_access_key" {
  type = string
  default = "<access-key-id>"
  sensitive = true
}

variable "aws_secret_key" {
  type = string
  default = "<secret-key>"
  sensitive = true
}
```

## Steps

### Initialize Terraform

```bash
terraform init
```
> Note: This step only needs to be done once.

### Validate configuration

```bash
terraform validate
```

### Create infrastructure resources

Running the following command will deploy the site and incur any necessary charges.

```bash
terraform apply
```

### Terminate resources
```bash
terraform destroy
```

[aws_cli_install]: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
[terraform]: https://www.terraform.io/
[terraform_install]: https://developer.hashicorp.com/terraform/downloads
