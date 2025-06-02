// pages/api/get-patients.js
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'patients.json');

export default function handler(req, res) {
    if (req.method === 'GET') {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const patients = JSON.parse(fileContent);
        res.status(200).json(patients);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
