Community Safety App

The Community Safety App is a full-stack project that empowers community members to report suspicious activity, view incidents by location, and support safer neighborhoods. 
Built with a secure and scalable backend powered by FastAPI and AWS Lambda, the app is designed for performance, affordability, and real-world usability.

This solo project was created as a way to deepen my cloud deployment and backend engineering skills, combining API design with real-world AWS architecture.



What the App Does

Users can submit local safety reports with a description and address
Incidents are processed by a Python API and stored in a backend system
The API is exposed via **AWS API Gateway** for web or mobile consumption
Deployed serverlessly using AWS Lambda and Python Layers

What’s Been Built So Far

- FastAPI backend with `/incident` endpoint (POST for reports)
-Dockerized Python environment to package clean `site-packages`
-Lambda layers built and zipped manually, matching AWS's strict format
- API Gateway configuration for public HTTP access
- IAM role setup and execution permissions granted
- CloudWatch log integration for debugging

🐛 Common Issues & Debugging Journey

### ❗️ImportError: `No module named 'pydantic_core'`

- This error came from AWS Lambda failing to find `pydantic_core`, which is a compiled dependency used by `pydantic` in FastAPI.
- Solution attempts:
  - Ensured correct packaging structure: `python/lib/python3.9/site-packages/`
  - Rebuilt the layer multiple times via Docker to guarantee Linux compatibility
  - Verified versioning and handler path (e.g., `main.handler`)
  - Used `zip -r python_layer.zip python/` to rebuild layer
- Outcome: still troubleshooting, but now layering version 4 with correct `.so` files and FastAPI modules.

🔁 Lambda Layer Version Conflicts

- Older layer versions lacked compiled libraries and failed silently
- Created multiple versions (`v1` through `v4`) to test dependency resolution
- Updated function layer merge order to prioritize full FastAPI layer

🛠️ Technologies Used

- **Python 3.9**
  Used as the core programming language for building the backend logic of the app. All API routes, data models, and Lambda functions were written in Python 3.9 to ensure compatibility with AWS Lambda’s supported runtimes.

- **FastAPI**
- Served as the web framework to define and manage API endpoints. FastAPI was chosen for its speed, simplicity, and automatic Swagger documentation. It powers features like:
/incident POST route to submit community reports
Fast JSON parsing and validation with Pydantic

- **AWS Lambda + Layers**
The backend runs serverlessly on AWS Lambda. Each function is deployed as a Lambda, meaning it only runs when needed — saving cost and improving scalability.
Layers were used to separate Python dependencies (like FastAPI, Pydantic) into reusable packages that could be attached to functions.
This reduced Lambda package size and made deployment more modular.

- **AWS API Gateway**
Acts as the public entry point to the app’s backend.
API Gateway exposes the Lambda function through an HTTP interface so frontend users (or any client) can interact with endpoints like /incident.

- **IAM for access control**
IAM roles were configured to:
Grant Lambda permission to execute code
Secure communication between Lambda, API Gateway, and CloudWatch
Prevent unauthorized access to backend services
IAM helped enforce the principle of least privilege for every AWS resource used in the app.

- **CloudWatch for logs**
Every time the backend Lambda runs, CloudWatch captures:
Request logs
Error traces (like missing modules)
Debug output used during deployment
It was crucial in troubleshooting import errors (e.g., pydantic_core not found) and understanding how AWS was executing the code.

- **Docker for packaging dependencies**
Used to package Python dependencies into a format compatible with AWS Lambda’s Linux-based environment.
Ensured libraries like pydantic_core were compiled correctly
Created accurate zip bundles for Lambda Layers
Allowed you to simulate the AWS runtime locally before deploying

Current Status

The backend code is successfully deployed to Lambda, and API Gateway is correctly routing to the `/incident` endpoint.

The current focus is resolving AWS layer import errors related to compiled dependencies like `pydantic_core`.


🔜 Coming Soon

- [ ] Successful POST request to `/incident` with full Lambda response
- [ ] Database integration (PostgreSQL or DynamoDB)
- [ ] Frontend connection (React)
- [ ] Authentication with JWT or Cognito
- [ ] Deployment of frontend via S3 or Vercel


Lessons Learned

- AWS Lambda layers must follow a strict folder structure to work
- `pydantic_core` requires compiled binary support in your deployment package
- Docker is essential for simulating AWS's Amazon Linux environment
- CloudWatch logs are your best friend for debugging AWS serverless apps
- Version control on Lambda layers helps isolate packaging issues



