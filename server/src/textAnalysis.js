const azureApiKeys = require("./azureApiKeys");
const os = require("os");
const CognitiveServicesCredentials = require("@azure/ms-rest-js");
const TextAnalyticsAPIClient = require("@azure/cognitiveservices-textanalytics");
const subscription_key = azureApiKeys.key;
const endpoint = azureApiKeys.endpoint;

module.exports = {
  sentimentAnalysis: sentimentAnalysis,
  createTextAnalysisClient: createTextAnalysisClient
};

async function createTextAnalysisClient() {
  const creds = new CognitiveServicesCredentials.ApiKeyCredentials({
    inHeader: { "Ocp-Apim-Subscription-Key": subscription_key }
  });
  const textAnalyticsClient = new TextAnalyticsAPIClient.TextAnalyticsClient(
    creds,
    endpoint
  );
  return textAnalyticsClient;
}

async function sentimentAnalysis(client, sentimentInput) {
  const sentimentJson = {
    documents: sentimentInput
  };
  const sentimentResult = await client.sentiment({
    multiLanguageBatchInput: sentimentJson
  });
  // console.log(sentimentResult.documents);
  // console.log(os.EOL);
  return sentimentResult;
}
