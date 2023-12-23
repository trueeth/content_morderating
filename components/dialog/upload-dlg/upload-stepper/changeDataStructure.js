const { forEach } = require("lodash")

const documentData ={
    "Name": "testw123",
    "Description": null,
    "Notes": null,
    "MediaSourceId": "49f5cc65-53c4-4caf-94dc-d1f29e6665ec",
    "Rating": "None",
    "ModeratorApprovalStatus": "New",
    "ModeratorNotes": null,
    "Language": "Arabic",
    "TotalProcessingStatus": "Processed",
    "DocumentBytes": "",
    "DocumentUrl": "documents/document-01b6fd75-d9a5-4052-a362-f2b623476df0-44.pdf",
    "OriginalFileName": "Dynamic Stamps.pdf",
    "FileName": "78c3ca00-b500-4582-8b48-bed8db91a48d.pdf",
    "VersionNumber": 6,
    "UploadedOnUtc": "2023-12-14T10:00:46.9948388+00:00",
    "RecognizeDocumentStatus": "Processed",
    "CreateSearchIndexStatus": "New",
    "CreateLanguageProjectStatus": "New",
    "RecognizeDocumentStartTime": "2023-12-14T10:00:48.0950334+00:00",
    "RecognizeDocumentEndTime": "2023-12-14T10:00:49.5883121+00:00",
    "CreateSearchIndexStartTime": "0001-01-01T00:00:00+00:00",
    "CreateSearchIndexEndTime": "0001-01-01T00:00:00+00:00",
    "CreateLanguageProjectStartTime": "0001-01-01T00:00:00+00:00",
    "CreateLanguageProjectEndTime": "0001-01-01T00:00:00+00:00",
    "OpenAIAnalysisStatus": "Processed",
    "OpenAIAnalysisStartTime": "2023-12-14T10:00:49.5949076+00:00",
    "OpenAIAnalysisEndTime": "2023-12-14T10:01:05.0770814+00:00",
    "DocumentSummarizationStatus": "Processed",
    "DocumentSummarizationStartTime": "2023-12-14T10:01:05.0770815+00:00",
    "DocumentSummarizationEndTime": "2023-12-14T10:01:06.3710281+00:00",
    "Summary": "تلقى مستخدم فوكسيت صفحات من كتاب. تمت قراءة وفهم محتوى الصفحات بعناية ويجب تلخيصها.",
    "ModeratorResponse": [],
    "EstimatedTokens": 0,
    "TotalTokens": 2030,
    "PromptTokens": 1062,
    "CompletionTokens": 968,
    "AiApproval": "Approved",
    "OpenAiModelDeployment": "GPT35Turbo16K",
    "PdfUrl": "https://gamrdatalake.blob.core.windows.net/uploads/documents/document-01b6fd75-d9a5-4052-a362-f2b623476df0-44.pdf?sv=2023-08-03&st=2023-12-15T10%3A16%3A28Z&se=2023-12-15T11%3A16%3A28Z&sr=b&sp=r&rsct=application%2Fpdf&sig=crc13VlbGLXfOjVuYWMzo4JGTXaIos529m66iS5X8Uw%3D",
    "GptResponse": [
        {
            "answers": [
                {
                    "questionId": 36,
                    "question": "Does the content delve into the defense policies of the Kingdom of Saudi Arabia? ",
                    "answerFound": false,
                    "AiApproval": "Approved",
                    "ModeratorAnswerFound": false,
                    "ModeratorApprovalStatus": "New",
                    "ModeratorNotes": null,
                    "pageNumbers": [
                        {
                            "pageNumber": 1,
                            "opinion": null,
                            "snippet": "APPROVED Foxit User , 10:36:44, 10/31/2017",
                            "AiApproval": "Approved",
                            "ModeratorAnswerFound": false,
                            "ModeratorApprovalStatus": "New",
                            "ModeratorLikeStatus": "New",
                            "ModeratorNotes": null
                        }
                    ]
                },
                {
                    "questionId": 37,
                    "question": "Does the book discuss efforts made to maintain national unity in the Kingdom of Saudi Arabia? ",
                    "answerFound": false,
                    "AiApproval": "Approved",
                    "ModeratorAnswerFound": false,
                    "ModeratorApprovalStatus": "New",
                    "ModeratorNotes": null,
                    "pageNumbers": [
                        {
                            "pageNumber": 1,
                            "opinion": null,
                            "snippet": "APPROVED Foxit User , 10:36:44, 10/31/2017",
                            "AiApproval": "Approved",
                            "ModeratorAnswerFound": false,
                            "ModeratorApprovalStatus": "New",
                            "ModeratorLikeStatus": "New",
                            "ModeratorNotes": null
                        }
                    ]
                },
                {
                    "questionId": 38,
                    "question": "Is there an examination of internal or external threats to the Kingdom of Saudi Arabia’s stability? ",
                    "answerFound": false,
                    "AiApproval": "Approved",
                    "ModeratorAnswerFound": false,
                    "ModeratorApprovalStatus": "New",
                    "ModeratorNotes": null,
                    "pageNumbers": [
                        {
                            "pageNumber": 1,
                            "opinion": null,
                            "snippet": "APPROVED Foxit User , 10:36:44, 10/31/2017",
                            "AiApproval": "Approved",
                            "ModeratorAnswerFound": false,
                            "ModeratorApprovalStatus": "New",
                            "ModeratorLikeStatus": "New",
                            "ModeratorNotes": null
                        }
                    ]
                },
                {
                    "questionId": 39,
                    "question": "How are strategies Saudi Arabia is taking for enhancing security and stability portrayed in the book? ",
                    "answerFound": false,
                    "AiApproval": "Approved",
                    "ModeratorAnswerFound": false,
                    "ModeratorApprovalStatus": "New",
                    "ModeratorNotes": null,
                    "pageNumbers": [
                        {
                            "pageNumber": 1,
                            "opinion": null,
                            "snippet": "APPROVED Foxit User , 10:36:44, 10/31/2017",
                            "AiApproval": "Approved",
                            "ModeratorAnswerFound": false,
                            "ModeratorApprovalStatus": "New",
                            "ModeratorLikeStatus": "New",
                            "ModeratorNotes": null
                        }
                    ]
                },
                {
                    "questionId": 40,
                    "question": "Are the Kingdom of Saudi Arabia’s relations with Arab, Islamic, and friendly countries portrayed in the book? ",
                    "answerFound": false,
                    "AiApproval": "Approved",
                    "ModeratorAnswerFound": false,
                    "ModeratorApprovalStatus": "New",
                    "ModeratorNotes": null,
                    "pageNumbers": [
                        {
                            "pageNumber": 1,
                            "opinion": null,
                            "snippet": "APPROVED Foxit User , 10:36:44, 10/31/2017",
                            "AiApproval": "Approved",
                            "ModeratorAnswerFound": false,
                            "ModeratorApprovalStatus": "New",
                            "ModeratorLikeStatus": "New",
                            "ModeratorNotes": null
                        }
                    ]
                }
            ],
            "Topic": {
                "Name": "National Security and Stability",
                "Id": "dfcb4d8a-4d49-4bf4-a26f-67d20d0aae88"
            },
            "AiApproval": "Approved"
        }
    ],
    "Id": "78c3ca00-b500-4582-8b48-bed8db91a48d"
}

let perPageData = [];

documentData.GptResponse.forEach((item) => {
    item.answers.forEach((answer) => {
        if(answer.pageNumbers.length > 0) {
            answer.pageNumbers.forEach((page) => {
                perPageData.push({
                    pageNumber: page.pageNumber,
                    questionId: answer.questionId,
                    question: answer.question,
                    answerFound: answer.answerFound,
                    AiApproval: answer.AiApproval,
                    ModeratorAnswerFound: answer.ModeratorAnswerFound,
                    ModeratorApprovalStatus: answer.ModeratorApprovalStatus,
                    ModeratorNotes: answer.ModeratorNotes,
                    opinion: page.opinion,
                    snippet: page.snippet,
                    ModeratorLikeStatus: page.ModeratorLikeStatus
                });
            });
        }
    });
});