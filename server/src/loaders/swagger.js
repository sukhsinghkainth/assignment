/**
 * @swagger
 * /api/v1/phoneBridge/clickToCall:
 *   post:
 *     summary: Initiates a click-to-call action
 *     description: This endpoint triggers a click-to-call action, which initiates a call between the source and destination numbers.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SourceNumber:
 *                 type: string
 *                 description: The source phone number initiating the call.
 *               DestinationNumber:
 *                 type: string
 *                 description: The destination phone number to receive the call.
 *               DisplayNumber:
 *                 type: string
 *                 description: The phone number to display on the recipient's phone.
 *               recoding:
 *                 type: integer
 *                 description: Optional flag for call recording (0 for no recording, 1 for recording).
 *               agentIdentifier:
 *                 type: string
 *                 description: Unique identifier for the agent initiating the call.
 *     responses:
 *       200:
 *         description: Call initiated successfully
 *         headers:
 *           Access-Control-Allow-Credentials:
 *             schema:
 *               type: string
 *               example: 'true'
 *           Access-Control-Allow-Origin:
 *             schema:
 *               type: string
 *               example: '*'
 *           Connection:
 *             schema:
 *               type: string
 *               example: keep-alive
 *           Content-Length:
 *             schema:
 *               type: string
 *               example: '1140'
 *           Date:
 *             schema:
 *               type: string
 *               example: Thu, 01 Jun 2023 05:44:19 GMT
 *           ETag:
 *             schema:
 *               type: string
 *               example: W/"474-4pbaU+VvJJctUuXcB6/x3v8JCEE"
 *           Keep-Alive:
 *             schema:
 *               type: string
 *               example: timeout=5
 *           X-Powered-By:
 *             schema:
 *               type: string
 *               example: Express
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the call initiation process.
 *                   example: success
 *                 message:
 *                   type: string
 *                   description: A message providing additional information about the call initiation.
 *                   example: "Call is initiated."
 *       400:
 *         description: Invalid request due to missing required parameters (DestinationNumber, DisplayNumber, or agentIdentifier).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Error status.
 *                   example: error
 *                 message:
 *                   type: string
 *                   description: Error message explaining the issue.
 *                   example: "Invalid request"
 *       500:
 *         description: Internal server error if something goes wrong while initiating the call.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Error status.
 *                   example: error
 *                 message:
 *                   type: string
 *                   description: Error message explaining the issue.
 *                   example: "Internal server error"
 * /api/v1/phoneBridge/callDisposition:
 *   post:
 *     summary: Handles call disposition
 *     description: This endpoint handles the disposition of a call based on the provided call session ID and agent identifier.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               callSessionId:
 *                 type: string
 *                 description: Unique session identifier for the call.
 *               agentIdentifier:
 *                 type: string
 *                 description: Unique identifier for the agent who handled the call.
 *     responses:
 *       200:
 *         description: Call disposition successfully processed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the call disposition process.
 *                   example: success
 *                 message:
 *                   type: string
 *                   description: A message providing additional information about the call disposition.
 *                   example: "Call disposition processed successfully."
 *       400:
 *         description: Invalid request due to missing required parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Error status.
 *                   example: error
 *                 message:
 *                   type: string
 *                   description: Error message explaining the issue.
 *                   example: "Invalid request"
 *       500:
 *         description: Internal server error if something goes wrong while processing the disposition.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Error status.
 *                   example: error
 *                 message:
 *                   type: string
 *                   description: Error message explaining the issue.
 *                   example: "Internal server error"
 */