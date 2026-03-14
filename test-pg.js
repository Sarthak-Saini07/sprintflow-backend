import jwt from 'jsonwebtoken';
import fetch from 'node-fetch'; // wait, Node 18+ has fetch built-in, no need. Or maybe wait...

const token = jwt.sign({ id: '64d3b6...', role: 'admin' }, 'supersecretkey', { expiresIn: '1d' });

async function getNotifications() {
  const rs = await fetch('http://localhost:5000/api/admin/notifications?page=1&limit=5', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const json = await rs.json();
  console.dir(json, { depth: null });
}

getNotifications();
