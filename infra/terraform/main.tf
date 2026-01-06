terraform {
  required_version = ">= 1.5.0"

  backend "s3" {
    bucket         = "community-safety-terraform-state"
    key            = "infra/terraform/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Dead-letter queue (DLQ)
resource "aws_sqs_queue" "report_postprocess_dlq" {
  name                      = "community-safety-report-postprocess-dlq"
  message_retention_seconds = 1209600 # 14 days
}

# Main queue
resource "aws_sqs_queue" "report_postprocess" {
  name                       = "community-safety-report-postprocess"
  visibility_timeout_seconds = 30
  message_retention_seconds  = 86400 # 1 day

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.report_postprocess_dlq.arn
    maxReceiveCount     = 5
  })
}
