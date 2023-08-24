#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function.html
resource "aws_lambda_function" "main" {
  function_name = var.function["function_name"]
  role          = aws_iam_role.lambda_role.arn
  package_type  = "Image"

  image_uri = var.image_url
  timeout   = var.function["timeout"]

  environment {
    variables = {
      PORT             = var.ENV_VARS["PORT"]
      MONGODB_URI      = var.ENV_VARS["MONGODB_URI"]
      TEST_MONGODB_URI = var.ENV_VARS["TEST_MONGODB_URI"]
      SECRET           = var.ENV_VARS["SECRET"]
      NODE_ENV         = var.ENV_VARS["NODE_ENV"]
    }
  }

  ephemeral_storage {
    size = 1024
  }
}

#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function_url
resource "aws_lambda_function_url" "main" {
  function_name      = aws_lambda_function.main.function_name
  authorization_type = "NONE"

  cors {
    allow_origins = ["*"]
    allow_methods = ["*"]
  }
}
