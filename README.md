Community Safety App
The Community Safety App is a full stack application that allows users to submit and track local safety reports.
The primary focus of this project is backend architecture, serverless deployment, and production level reliability rather than interface complexity.

This project was built to strengthen my experience with:
•	API design
•	AWS serverless architecture
•	Infrastructure as code
•	Runtime debugging and observability
 
Architecture Overview
The application follows a serverless architecture designed for scalability and operational simplicity.
High Level Flow
Client Request
API Gateway
Lambda running FastAPI backend
Request validation and processing
CloudWatch logging

Design Principles
•	Stateless compute using Lambda
•	Strict schema validation using Pydantic
•	Least privilege IAM configuration
•	Declarative infrastructure management with Terraform
•	Observability driven debugging
•	Incremental deployment strategy
 
Core Functionality
•	Users submit structured safety reports containing a description and location
•	Requests are validated and processed by a FastAPI backend
•	The API is exposed publicly through API Gateway
•	The backend executes on AWS Lambda
•	Dependencies are packaged using Lambda Layers for runtime compatibility
 
Backend Design
The backend is implemented with a focus on structured data handling and predictable system behavior.
Key implementation decisions:
•	RESTful endpoint design using POST incident
•	Early request validation with Pydantic models
•	Consistent JSON response formatting
•	Clear separation of routing and business logic
•	Controlled error handling to prevent malformed data propagation
 
AWS Implementation
Lambda
•	Scalable compute layer for backend execution
•	Tuned memory and timeout configuration
•	Execution roles configured using least privilege principles
API Gateway
•	Public HTTP interface for backend endpoints
•	Secure routing of client requests to Lambda
IAM
•	Restricts service permissions to only required access
•	Enforces controlled service communication
CloudWatch
•	Captures runtime logs
•	Provides execution trace visibility
•	Supports production debugging and monitoring
 
CI and Deployment
GitHub Actions enforces quality gates on every push:
•	Ruff runs lint validation
•	Pytest verifies API startup
•	A Lambda deployment artifact is built
This ensures the codebase remains deployable and validated prior to release.
 
Infrastructure as Code
Infrastructure is defined declaratively using Terraform.
Managed resources include:
•	AWS Lambda
•	API Gateway
•	IAM roles and policies

Benefits:
•	Version controlled infrastructure
•	Repeatable environment setup
•	Reduced configuration drift
•	Controlled infrastructure updates
 
Engineering Challenge
A runtime failure occurred due to compiled dependency incompatibility within the Lambda layer. The issue was resolved by rebuilding dependencies inside a Docker based Linux environment to match the AWS runtime and validating layer structure compliance. CloudWatch logs were used to confirm resolution.
 
Technologies Used
Backend
•	Python
•	FastAPI
•	Pydantic
Cloud
•	AWS Lambda
•	API Gateway
•	IAM
•	CloudWatch
•	Terraform
DevOps
•	GitHub Actions
•	Docker
•	Ruff
•	Pytest






