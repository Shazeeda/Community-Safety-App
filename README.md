# Community Safety App

The Community Safety App is a full stack application that allows users to submit and track local safety reports. The primary focus of this project is backend architecture, serverless deployment, and production reliability rather than interface complexity.

This project strengthened my experience in API design, AWS serverless systems, infrastructure as code, and runtime debugging in a real cloud environment.

## Architecture

The application follows a serverless architecture designed for scalability and operational simplicity.

High level flow  
Client request → API Gateway → Lambda running FastAPI → Validation and processing → CloudWatch logging

Design principles

- Stateless compute using Lambda  
- Strict schema validation using Pydantic  
- Least privilege IAM configuration  
- Infrastructure managed with Terraform  
- Observability driven debugging  
- Incremental deployment strategy  

## Core Functionality

- Users submit structured safety reports containing a description and location  
- Requests are validated and processed by a FastAPI backend  
- The API is exposed publicly through API Gateway  
- The backend executes on AWS Lambda  
- Dependencies are packaged using Lambda Layers  

## Backend Design

- RESTful endpoint using POST incident  
- Early request validation  
- Clear separation of routing and business logic  
- Consistent JSON response formatting  
- Controlled error handling  

## AWS Implementation

- Lambda provides scalable compute  
- API Gateway routes and secures requests  
- IAM roles restrict permissions following least privilege principles  
- CloudWatch captures runtime logs and execution metrics  

## CI and Deployment

- Ruff runs lint checks  
- Pytest validates API startup  
- Lambda deployment artifact built via GitHub Actions  

## Infrastructure as Code

Infrastructure is defined using Terraform and includes Lambda, API Gateway, and IAM roles.

## Engineering Challenge

A runtime failure occurred due to dependency incompatibility within the Lambda layer. The issue was resolved by rebuilding dependencies inside a Docker based Linux environment to match the AWS runtime and validating layer structure compliance using CloudWatch logs.

## Technologies

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

