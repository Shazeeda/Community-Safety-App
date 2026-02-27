Community Safety App

The Community Safety App is a full stack application that allows users to submit and track local safety reports. The primary focus of this project is backend architecture, serverless deployment, and production level reliability rather than interface complexity. It was built to strengthen my experience with API design, AWS serverless systems, infrastructure as code, and operational debugging.

Architecture

The application follows a serverless architecture designed for scalability and operational simplicity.

High Level Flow

Client Request
API Gateway
Lambda running FastAPI backend
Request validation and processing
CloudWatch logging

Design Principles

Stateless compute using Lambda
Strict schema validation using Pydantic
Least privilege IAM configuration
Declarative infrastructure management with Terraform
Observability driven debugging
Incremental deployment strategy

Core Functionality

Users submit safety reports containing structured information such as description and location.
Requests are validated and processed by a FastAPI backend.
The API is exposed publicly through API Gateway and executed on AWS Lambda.
Dependencies are packaged using Lambda Layers to ensure runtime compatibility.

Backend Design

The backend is implemented with a focus on structured data handling and predictable system behavior.

RESTful endpoint design using POST incident
Early request validation with Pydantic models
Consistent JSON response structure
Separation of routing and business logic
Controlled error handling to prevent malformed data propagation

AWS Implementation

Lambda provides scalable compute with tuned memory and timeout settings.
API Gateway routes and secures external requests.
IAM roles restrict service permissions according to least privilege principles.
CloudWatch captures runtime logs and execution metrics for monitoring and debugging.

CI and Deployment

GitHub Actions enforces quality checks on every push.

Ruff runs lint validation
Pytest verifies API startup
A Lambda deployment artifact is built

This ensures the codebase remains deployable and validated prior to release.

Infrastructure as Code

Infrastructure is defined declaratively using Terraform.

Managed resources include Lambda, API Gateway, and IAM roles.
This approach provides version controlled infrastructure, repeatable environments, and controlled change management.

Engineering Challenge

A runtime failure occurred due to compiled dependency incompatibility within the Lambda layer. The issue was resolved by rebuilding dependencies inside a Docker based Linux environment to match the AWS runtime and validating layer structure compliance. CloudWatch logs were used to confirm resolution.

Technologies Used

Backend
Python
FastAPI
Pydantic

Cloud
AWS Lambda
API Gateway
IAM
CloudWatch
Terraform

DevOps
GitHub Actions
Docker
Ruff
Pytest







