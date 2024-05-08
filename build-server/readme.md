## Build server

Given a public github repo, it should be able to clone the repo into into a container, build it, and store the build output into a S3 bucket.

### Expected environment variables

- AWS_ACCESS_KEY_ID = AWS accesskey id
- AWS_SECRET_ACCESS_KEY = AWS secret access key
- GIT_REPO_URL = Github repository to be deployed
- PROJECT_ID = A unique id identifying the project

### Steps

- [x] Clone the repository into /home/app/code 
- [x] Build the code that has been cloned 
- [x] Upload the build files into S3
