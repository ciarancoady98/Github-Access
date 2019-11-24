const azureApiKeys = require("./azureApiKeys");
const os = require("os");
const CognitiveServicesCredentials = require("@azure/ms-rest-js");
const TextAnalyticsAPIClient = require("@azure/cognitiveservices-textanalytics");
const subscription_key = azureApiKeys.key;
const endpoint = azureApiKeys.endpoint;

const creds = new CognitiveServicesCredentials.ApiKeyCredentials({
  inHeader: { "Ocp-Apim-Subscription-Key": subscription_key }
});
const textAnalyticsClient = new TextAnalyticsAPIClient.TextAnalyticsClient(
  creds,
  endpoint
);
