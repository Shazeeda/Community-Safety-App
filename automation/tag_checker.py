import boto3
REQUIRED_TAGS = ['Owner', 'Environment', 'CostCenter']

def check_tags_for_ec2():
    ec2 = boto3.client('ec2')
    response = ec2.describe_instances()
    flagged = []

    for reservation in response['Reservations']:
        for instance in reservation['Instances']:
            tags = {t['Key']: t['Value'] for t in instance.get('Tags', [])}
            missing = [key for key in REQUIRED_TAGS if key not in tags]
            if missing:
                flagged.append({
                    'Resource': instance['InstanceId'],
                    'Type': 'EC2',
                    'MissingTags': missing
                })
    return flagged

def check_tags_for_s3():
    s3 = boto3.client('s3')
    flagged = []

    for bucket in s3.list_buckets().get('Buckets', []):
        try:
            tagging = s3.get_bucket_tagging(Bucket=bucket['Name'])
            tags = {t['Key']: t['Value'] for t in tagging['TagSet']}
        except Exception:
            tags = {}

        missing = [key for key in REQUIRED_TAGS if key not in tags]
        if missing:
            flagged.append({
                'Resource': bucket['Name'],
                'Type': 'S3',
                'MissingTags': missing
            })
    return flagged

if __name__ == "__main__":
    all_issues = []
    all_issues.extend(check_tags_for_ec2())
    all_issues.extend(check_tags_for_s3())

    if not all_issues:
        print("All resources have required tags.")
    else:
        print("Resources with missing tags:")
        for issue in all_issues:
            print(issue)
