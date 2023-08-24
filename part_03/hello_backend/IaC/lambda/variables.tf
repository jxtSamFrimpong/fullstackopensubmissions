variable "lambda" {
  default = {
    logging_name = "backend"
    role_name    = "backend"
  }
}

variable "function" {
  default = {
    function_name = "backend"
    timeout       = 3
  }
}

variable "image_url" {
  default = ""
}

variable "ENV_VARS" {
  type = map(any)
  default = {
    PORT             = 3001
    MONGODB_URI      = ""
    TEST_MONGODB_URI = ""
    SECRET           = ""
    NODE_ENV         = ""
  }
}

variable "region" {
  default = "us-east-1"
}

variable "profile" {
  default = "default"
}

variable "tags" {
  default = {
    environment = "dev"
    project     = "node-docker-lambda-terraform"
  }
}
