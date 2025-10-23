/**
 * Vercel Serverless Function: /api/greeting
 * * This function runs on the server (backend), not in the user's browser.
 * It is a standard Node.js module that Vercel's runtime will execute.
 */

// This is the main function that Vercel calls when the endpoint is hit.
// 'req' (request) contains the data sent by the frontend (like the user's name).
// 'res' (response) is what this function sends back to the frontend.
export default async function handler(req, res) {
    // 1. Ensure the request method is POST (as defined in index.html)
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed. Use POST.' });
        return;
    }

    try {
        // 2. Safely extract the data sent by the frontend
        const { name } = req.body; 

        // 3. Simple Server-Side Logic
        if (!name) {
            res.status(400).json({ message: "Please provide a 'name' in the request body." });
            return;
        }

        // 4. Construct the dynamic response message
        const serverMessage = `Hello, ${name}! Your greeting was processed on the Vercel backend. This demonstrates successful full-stack communication.`;

        // 5. Send a successful JSON response back to the frontend
        res.status(200).json({ message: serverMessage });

    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: 'Internal Server Error during processing.' });
    }
}
