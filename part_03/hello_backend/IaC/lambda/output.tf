output "function" {
  value = {
    arn  = aws_lambda_function.main.arn
    name = aws_lambda_function.main.function_name
    url  = aws_lambda_function_url.main.function_url
  }
}
