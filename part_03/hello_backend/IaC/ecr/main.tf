#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecr_repository.html

resource "aws_ecr_repository" "main" {
  for_each             = toset(var.ecr_names)
  name                 = each.key
  image_tag_mutability = var.image_tag_mutability
  encryption_configuration {
    encryption_type = var.encryption_type
  }
  image_scanning_configuration {
    scan_on_push = true
  }

}
