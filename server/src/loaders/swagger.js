/**
 * @swagger
 * /api/v1/searchStudent:
 *   get:
 *     summary: Search for students
 *     description: Retrieve a list of students matching the search criteria
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: true
 *         description: The search term to filter students
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   class:
 *                     type: string
 *                     example: 10
 *                   rollNumber:
 *                     type: string
 *                     example: 12345
 *       400:
 *         description: Invalid search term
 */