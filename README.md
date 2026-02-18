The Community Safety App is a full-stack project designed to allow community members to submit and track local safety reports.
The focus of this project is backend architecture, cloud-native deployment, and production-style reliability practices rather than UI complexity.
It was built to deepen my experience with API design, AWS serverless architecture, infrastructure-as-code, and operational debugging in a real-world environment.

Architecture & Engineering Overview
This application follows a serverless architecture designed for scalability, reliability, and operational simplicity.

High-Level Flow
Client Request
      ↓
AWS API Gateway
      ↓
AWS Lambda (FastAPI backend)
      ↓
Request Validation & Processing
      ↓
CloudWatch Logging & Monitoring

** Design Principles Applied **
- Stateless compute (Lambda)
- Strict request validation (Pydantic)
- Least-privilege IAM permissions
- Infrastructure defined declaratively
- Observability-first debugging
- Incremental deployment strategy
This architecture supports automatic scaling, reduced operational overhead, and reliable deployment practices.

** What the App Does **
- Users can submit local safety reports with a description and address
- Reports are processed through a FastAPI backend
- The API is exposed publicly via AWS API Gateway
- The backend runs serverlessly using AWS Lambda
- Dependencies are packaged via Lambda Layers
The system is built to demonstrate real-world backend engineering practices using AWS-native services.

** Backend API Design **
The backend is implemented using FastAPI.
Key implementation principles:

- RESTful endpoint structure (POST /incident)
- Strict request validation with Pydantic models
- Consistent JSON response formatting
- Clear separation of route definitions and business logic
- Error handling designed for predictable client behavior
Validation occurs early to prevent malformed data from entering the system.

** AWS Cloud Architecture **
AWS Lambda

- Serverless compute for backend execution
- Scales automatically based on demand
- Tuned memory and timeout configurations
- Uses execution roles following least-privilege principles

** AWS API Gateway **

- Public HTTP interface for backend endpoints
- Routes client requests securely to Lambda
- Handles integration and request forwarding

** IAM (Identity & Access Management) **
IAM roles are configured to:

- Grant Lambda only required permissions
- Secure communication between services
- Enforce least-privilege access control

** CloudWatch **
CloudWatch is used for:

- Runtime logs
- Error traces
- Duration monitoring
- Debugging deployment issues
- Observing Lambda execution behavior
Operational debugging always begins with structured logs and metrics rather than guesswork.

** Docker & Dependency Packaging **
Docker was used to package Python dependencies in a Linux-compatible format for AWS Lambda.

This ensured:
- Compiled dependencies (like pydantic_core) matched AWS runtime requirements
- Consistent packaging structure
- Reliable layer deployment

This helped simulate the Lambda environment locally before deployment.

** Engineering Challenges & Resolutions **
During development, I encountered runtime import errors related to compiled dependencies within Lambda layers.
Resolution involved:

- Rebuilding dependencies inside a Docker-based Linux environment
- Verifying Lambda layer folder structure compliance
- Iterating through version-controlled layer updates
- Using CloudWatch logs to trace runtime execution failures
This process strengthened my understanding of serverless deployment mechanics and runtime compatibility.

** CI/CD & Deployment Strategy **
The project uses GitHub Actions to enforce quality gates.

On each push:
- Ruff runs linting checks
- Pytest smoke tests validate API startup
- A Lambda deployment artifact is built

This ensures:
- Code remains deployable at all times
- Broken builds are blocked automatically
- Changes are validated before reaching AWS
Deployment artifacts are versioned and reproducible.

** Infrastructure as Code (Terraform) **
Infrastructure is managed declaratively using Terraform.
Defined resources include:

- AWS Lambda
- API Gateway
- IAM roles and policies

Benefits of this approach:
- Version-controlled infrastructure
- Repeatable environment setup
- Reduced configuration drift
- Safer infrastructure updates
- Clear audit trail of changes
Infrastructure changes follow the same reviewable workflow as application code.

** Lessons Learned **
- Lambda layers must follow strict folder structure rules
- Compiled dependencies require Linux-compatible packaging
- Docker improves runtime consistency
- CloudWatch logs are essential for debugging serverless systems
- Infrastructure-as-code reduces manual configuration errors
- Incremental deployments improve system reliability


Technologies Used
Backend 
- Python 3.9
- FastAPI
- Pydantic

Cloud & Infrastructure
- AWS Lambda
- API Gateway
- IAM
- CloudWatch
- Terraform

DevOps
- GitHub Actions
- Docker
- Ruff
- Pytest







