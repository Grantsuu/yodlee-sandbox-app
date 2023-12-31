# yodlee-sandbox-app frontend
Frontend for displaying the visual interactions with the yodlee sandbox API.
## Prerequisites
If using Google Cloud SDK ensure the right Google Platform project is selected using:
```
gcloud config set project conductive-bank-400222
```
## Deployment
To deploy this code to the Google Cloud Run service use the following steps:
1. Build and deploy the react app with:
    ```
    gcloud run deploy frontend --source . --region=us-east1
    ```
    <p>If prompted with <code>Allow unauthenticated invocations to [frontend] (y/N)?</code> enter <kbd>y</kbd>.</p>

1. Go to the Service URL provided when the command finishes to verify the app is running.
    ```
    https://frontend-m6f5pdrxua-ue.a.run.app
    ```