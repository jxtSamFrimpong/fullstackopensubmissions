lambda = {
  logging_name = "backend"
  role_name    = "backend"
}

function = {
  function_name = "backend"
  timeout       = 60
}

image_url = "522986700920.dkr.ecr.eu-west-1.amazonaws.com/backend:latest"

ENV_VARS = {
  PORT             = 3001
  MONGODB_URI      = ""
  TEST_MONGODB_URI = ""
  SECRET           = ""
  NODE_ENV         = "test"
}

region = "eu-west-1"

profile = "papacrom"

tags = {
  environment = "dev"
  project     = "node-docker-lambda-terraform"
}
