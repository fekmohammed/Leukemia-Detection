// pages/api/add-patient.js

import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'patients.json');

export default function handler(req, res) {
    if (req.method === 'POST') {
        const newPatient = req.body;

        // Read existing data
        let data = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            data = JSON.parse(fileContent);
        }

        // Add new patient
        data.push(newPatient);

        // Write updated data
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        res.status(200).json({ message: 'Patient added successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
