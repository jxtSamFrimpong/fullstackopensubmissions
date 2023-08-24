#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy.html
resource "aws_iam_policy" "lambda_logging" {
  name        = var.lambda["logging_name"]
  path        = "/"
  description = "IAM policy for logging from a lambda function"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "arn:aws:logs:*:*:*"
        Effect   = "Allow"
      }
    ]
  })
}

#https://registry.terraform.io/providers/hashicorp/aws/3.74.3/docs/resources/iam_role_policy_attachment
resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}

#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role.html
resource "aws_iam_role" "lambda_role" {
  name = var.lambda["role_name"]

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = ""
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })

}
