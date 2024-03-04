// //proxy.ts
// import axios from 'axios';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         const { method, query, body } = req;
//         const { url } = query;

//         const apiResponse = await axios({
//             method,
//             url: `https://sip-backend-api.onrender.com/api/v1/${url}`,
//             data: body,
//             headers: {
//                 'Content-Type': 'application/json',
//                 // Add any other headers if necessary
//             },
//         });

//         res.status(apiResponse.status).json(apiResponse.data);
//     } catch (error) {
//         console.error('Proxy error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }
