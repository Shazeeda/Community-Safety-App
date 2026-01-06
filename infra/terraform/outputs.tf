output "report_postprocess_queue_url" {
  description = "SQS queue URL for report post-processing"
  value       = aws_sqs_queue.report_postprocess.id
}

output "report_postprocess_queue_arn" {
  description = "SQS queue ARN for report post-processing"
  value       = aws_sqs_queue.report_postprocess.arn
}
