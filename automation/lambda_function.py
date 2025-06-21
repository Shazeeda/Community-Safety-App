import boto3

REQUIRED_TAGS = ["Owner", "Environment", "CostCenter"]

def check_missing_tags():
    s3 = boto3.client("s3")
    response = s3.list_buckets()

    issues = []
    for bucket in response["Buckets"]:
        bucket_name = bucket["Name"]
        try:
            tagging = s3.get_bucket_tagging(Bucket=bucket_name)
            tags = {tag['Key']: tag['Value'] for tag in tagging['TagSet']}
            missing = [tag for tag in REQUIRED_TAGS if tag not in tags]
            if missing:
                issues.append({
                    "Resource": bucket_name,
                    "Type": "S3",
                    "MissingTags": missing
                })
        except s3.exceptions.ClientError as e:
            if e.response['Error']['Code'] == 'NoSuchTagSet':
                issues.append({
                    "Resource": bucket_name,
                    "Type": "S3",
                    "MissingTags": REQUIRED_TAGS
                })

    return issues

def lambda_handler(event, context):
    results = check_missing_tags()
    if results:
        print("Resources with missing tags:")
        for r in results:
            print(r)
    else:
        print("All resources are properly tagged.")

    return {"statusCode": 200, "body": results}
