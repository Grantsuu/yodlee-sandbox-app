# yodlee-sandbox-app backend
Web server for interacting with the yodlee sandbox API.
## Prerequisites
If using Google Cloud SDK ensure the right Google Platform project is selected using:
```
gcloud config set project conductive-bank-400222
```
## Deployment
To deploy this code to the Google Cloud Run service use the following steps:
1. Make sure you are in the same directory as the `main.go` file:
    ```
    cd ~/Code/Repos/yodlee-sandbox-app/backend
    ```
2. Deploy the backend to the Cloud Run container with:
    ```
    gcloud run deploy backend --source . --region=us-east1
    ```
    <p>If prompted with <code>Allow unauthenticated invocations to [frontend] (y/N)?</code> enter <kbd>y</kbd>.</p>

3. Go to the Service URL provided when the command finishes to verify the app is running.
    ```
    https://backend-m6f5pdrxua-ue.a.run.app
    ```