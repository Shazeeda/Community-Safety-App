🌍 Community Safety App
A smart, cloud-native application that enables community members to report safety concerns and access resources in real time. Designed to enhance public safety awareness, this app serves as a digital hub for communication, accountability, and action.

🧠 AI-Driven Infrastructure Auditing
Automates AWS resource compliance checks using Python and Boto3.
Core Logic: automation/tag_checker.py (tag scanning), triggered via automation/lambda_function.py (Lambda handler)
What it does: Scans AWS resources (e.g., EC2, S3) for required tags like CostCenter, Owner, and Environment.
Impact on AWS: Enforces tagging policies to ensure cost accountability and governance hygiene across cloud infrastructure.

⚙️ Serverless Monitoring Job
Uses the same audit logic to perform continuous infrastructure compliance checks.
Same Core Logic: tag_checker.py + lambda_function.p
What it does: Can be configured to run on a schedule and send alerts (via Slack/email) when AWS resources are misconfigured or missing required tags.
Impact on AWS: Enables proactive monitoring and automated enforcement without manual intervention.

☁️ Fully Hosted on AWS
Cloud-native deployment using AWS services for scalability and cost efficiency.
Frontend: React app deployed to Amazon S3 static site hosting
Backend: FastAPI app deployed via AWS Lambda + API Gateway
Backend Entry Point: python_api/main.py
What it does: API Gateway exposes the FastAPI endpoints to the internet, with CORS enabled to ensure frontend–backend communication.
Impact on AWS: Eliminates server management while allowing secure, scalable app functionality.

💬 Safety Report Submission API
Handles user-submitted safety alerts in real time.
Route Handler: backend/routes.py
What it does: Defines a /reports POST route that accepts user_id, location, and message, then generates an automated response.
Impact on Project: Core API for community reporting; connects frontend form data to backend response generation.

🛠️ Tech Stack
Frontend: React + HTML/CSS
Backend: FastAPI + Mangum
Automation & Auditing: Python (Boto3)

Infra & Hosting: AWS Lambda, S3, IAM, API Gateway

Version Control & CI/CD: GitHub


