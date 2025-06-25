'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const dummySubmissions = [
  {
    id: 1,
    name: 'Aarya Roy',
    category: ['Singer', 'Performer'],
    location: 'Mumbai',
    feeRange: '₹10k - ₹20k',
  },
  {
    id: 2,
    name: 'Raj Sharma',
    category: ['DJ'],
    location: 'Delhi',
    feeRange: '₹15k - ₹25k',
  },
  {
    id: 3,
    name: 'Maya Iyer',
    category: ['Speaker'],
    location: 'Bangalore',
    feeRange: '₹8k - ₹12k',
  },
];

export default function ManagerDashboard() {
  const [submissions, setSubmissions] = useState(dummySubmissions);

  const handleAction = (id) => {
    alert(`Action clicked for Artist ID: ${id}`);
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Artist Submissions</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border rounded-md shadow-sm">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="text-left p-3 border-b">Name</th>
              <th className="text-left p-3 border-b">Category</th>
              <th className="text-left p-3 border-b">City</th>
              <th className="text-left p-3 border-b">Fee</th>
              <th className="text-left p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((artist) => (
              <tr key={artist.id} className="hover:bg-gray-50">
                <td className="p-3 border-b font-medium">{artist.name}</td>
                <td className="p-3 border-b">{artist.category.join(', ')}</td>
                <td className="p-3 border-b">{artist.location}</td>
                <td className="p-3 border-b">{artist.feeRange}</td>
                <td className="p-3 border-b">
                  <Button variant="outline" onClick={() => handleAction(artist.id)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
            {submissions.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No submissions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
