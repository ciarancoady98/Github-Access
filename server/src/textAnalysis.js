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
  console.log("3. This will perform sentiment analysis on the sentences.");

  const sentimentInput = {
    documents: [
      { language: "en", id: "1", text: "I had the best day of my life." },
      {
        language: "en",
        id: "2",
        text: "This was a waste of my time. The speaker put me to sleep."
      },
      {
        language: "es",
        id: "3",
        text: "No tengo dinero ni nada que dar..."
      },
      {
        language: "it",
        id: "4",
        text:
          "L'hotel veneziano era meraviglioso. È un bellissimo pezzo di architettura."
      }
    ]
  };

  const sentimentResult = await client.sentiment({
    multiLanguageBatchInput: sentimentInput
  });
  console.log(sentimentResult.documents);
  console.log(os.EOL);
}
