variable "account_id" {
  type        = string
  description = "AWS account ID"
}

variable "domain_name" {
  type        = string
  description = "Base domain name for backend and frontend"
}

variable "google_client_id" {
  type        = string
  description = "Google client ID for OAuth"
}
