variable "ecr_names" {
  description = "names of ecr repos"
  type        = any
}

variable "image_tag_mutability" {
  description = "Provide image immutability, can be MUTABLE or IMMUTABLE"
  type        = string
  default     = "IMMUTABLE"
}

variable "encryption_type" {
  description = "type of encryption to be used"
  type        = string
  default     = "KMS"
}

variable "tags" {
  description = "its always a good thing to tag your resources"
  type        = map(string)
  default     = {}
}

variable "region" {
  description = "region of aws provider"
  type        = string
  default     = "us-east-1"
}

variable "profile" {
  description = "aws profile to use"
  type        = string
  default     = "default"
}
