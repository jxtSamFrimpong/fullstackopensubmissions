output "ecr_url" {
  value = [for repo in aws_ecr_repository.main : repo.repository_url]
}

output "ecr_arn" {
  value = [for repo in aws_ecr_repository.main : repo.arn]
}
