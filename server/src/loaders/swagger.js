/**
 * @swagger
 * /api/v1/searchStudents:
 *   get:
 *     summary: Search for students
 *     description: Retrieve a list of students matching the search criteria.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: true
 *         description: The search term to filter students (only alphabetic characters and spaces allowed).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of students to retrieve per page.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         required: false
 *         description: The starting point for fetching students.
 *     responses:
 *       200:
 *         description: A list of students.
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
 *         description: Invalid search term or query parameters.
 */

/**
 * @swagger
 * /api/v1/student:
 *   get:
 *     summary: Retrieve student details
 *     description: Get the details of a specific student by their roll number.
 *     parameters:
 *       - in: query
 *         name: rollNumber
 *         schema:
 *           type: integer
 *         required: true
 *         description: The roll number of the student.
 *     responses:
 *       200:
 *         description: Details of the student.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 class:
 *                   type: string
 *                   example: 10
 *                 rollNumber:
 *                   type: integer
 *                   example: 12345
 *       400:
 *         description: Missing or invalid roll number.
 */
