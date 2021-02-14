About this:
https://willmanntobias.medium.com/how-to-use-google-search-console-api-and-google-cloud-functions-with-javascript-nodejs-to-push-39f9a144757f

export GOOGLE_APPLICATION_CREDENTIALS="gsc-test-video-a5e01ece4a8c.json"

sudo gcloud functions deploy gsc-test-video-cloud-function --service-account=gsc-test-video@gsc-test-video.iam.gserviceaccount.com --env-vars-file .env.yaml --entry-point startit --runtime nodejs12 --trigger-http --allow-unauthenticated