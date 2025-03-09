import requests
import time
import random

# Define the API endpoint
API_URL = "http://localhost:8070/issue/createIssue"

# List of different request bodies
issue_samples = [
    {
        "UserId": "1001",
        "studentName": "Alice Johnson",
        "studentEmail": "alice@example.com",
        "studentRegistrationNo": "REG1001",
        "studentFaculty": "Science",
        "studentCampus": "Main Campus",
        "studentContactNo": "9876543210",
        "issueType": "EXAMINATION_ISSUE",
        "issueMessage": "Exam dates are clashing with another subject.",
        "issueAttachment": None,
        "issueStatus": "Pending",
        "issueResolvedBy": None,
        "issueCreatedDate": "2025-03-09T10:00:00Z",
        "issueResolvedDate": None,
        "issueResolvedMessage": None,
        "issuePriority": None
    },
    {
        "UserId": "1002",
        "studentName": "Bob Williams",
        "studentEmail": "bob@example.com",
        "studentRegistrationNo": "REG1002",
        "studentFaculty": "Business",
        "studentCampus": "City Campus",
        "studentContactNo": "9123456789",
        "issueType": "PAYMENT_ISSUE",
        "issueMessage": "My tuition fee payment is not reflecting.",
        "issueAttachment": None,
        "issueStatus": "Pending",
        "issueResolvedBy": None,
        "issueCreatedDate": "2025-03-09T10:01:00Z",
        "issueResolvedDate": None,
        "issueResolvedMessage": None,
        "issuePriority": None
    },
    {
        "UserId": "1003",
        "studentName": "Charlie Brown",
        "studentEmail": "charlie@example.com",
        "studentRegistrationNo": "REG1003",
        "studentFaculty": "Engineering",
        "studentCampus": "Tech Park",
        "studentContactNo": "9234567890",
        "issueType": "MODULE_CONTENT_ISSUE",
        "issueMessage": "Course materials are missing in the online portal.",
        "issueAttachment": None,
        "issueStatus": "Pending",
        "issueResolvedBy": None,
        "issueCreatedDate": "2025-03-09T10:02:00Z",
        "issueResolvedDate": None,
        "issueResolvedMessage": None,
        "issuePriority": None
    },
    {
        "UserId": "1004",
        "studentName": "David Smith",
        "studentEmail": "david@example.com",
        "studentRegistrationNo": "REG1004",
        "studentFaculty": "Humanities",
        "studentCampus": "South Campus",
        "studentContactNo": "9345678901",
        "issueType": "CAMPUS_ENVIRONMENT_ISSUE",
        "issueMessage": "Classroom air conditioning is not working.",
        "issueAttachment": None,
        "issueStatus": "Pending",
        "issueResolvedBy": None,
        "issueCreatedDate": "2025-03-09T10:03:00Z",
        "issueResolvedDate": None,
        "issueResolvedMessage": None,
        "issuePriority": None
    },
    {
        "UserId": "1005",
        "studentName": "Emma Wilson",
        "studentEmail": "emma@example.com",
        "studentRegistrationNo": "REG1005",
        "studentFaculty": "Law",
        "studentCampus": "West Campus",
        "studentContactNo": "9456789012",
        "issueType": "REGISTRATION_ISSUE",
        "issueMessage": "Unable to register for new semester courses.",
        "issueAttachment": None,
        "issueStatus": "Pending",
        "issueResolvedBy": None,
        "issueCreatedDate": "2025-03-09T10:04:00Z",
        "issueResolvedDate": None,
        "issueResolvedMessage": None,
        "issuePriority": None
    }
]

# Start time
start_time = time.time()
duration = 60  # Run for 1 minute

# Run the loop for 1 minute
while time.time() - start_time < duration:
    try:
        # Randomly pick an issue from the list
        issue_data = random.choice(issue_samples)

        # Send a POST request
        response = requests.post(API_URL, json=issue_data)

        # Print the response
        if response.status_code == 200:
            print("Issue created successfully:", response.json())
        else:
            print("Failed to create issue:", response.status_code, response.text)

    except requests.exceptions.RequestException as e:
        print("Error:", e)

    # Wait 1 second before the next request
    time.sleep(1)

print("Script execution completed.")
