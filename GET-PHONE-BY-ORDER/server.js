const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.get('/api/order/:inoutputId', async (req, res) => {
  const { inoutputId } = req.params;
  const cookie = req.headers['cookie'] || 'eyJpdiI6ImIra2pmWitCVVRRTlp2K3pRUUZOZ1E9PSIsInZhbHVlIjoibXpYaFhkQmVZU1VMRFRKWWhEcXRCdnBFSWdycVNzNFlSVHpGWjVYT0hTVDFpdlErVWxDSWhEaVdcL3JyT2RvSjZIcDNkMVJSYTllZDJMMTlsR2ZIQ3BnPT0iLCJtYWMiOiI2MDc2MTFlNDg0MTg4M2IyNDBiNDAzMDE4ZWE0MTk0ZTFkNDdlNGU3MjQ0ZjA3ODFkYTlkYzZiMjcyOTEyMzNmIn0%3D';

  try {
    const apiResponse = await fetch(`https://ec.megaads.vn/service/inoutput/find-promotion-codes-api?inoutputId=${inoutputId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'platform': 'ios',
        'Cookie': cookie,
        'User-Agent': 'chiakiApp/3.6.2'
      }
    });

    if (!apiResponse.ok) throw new Error(`API error: ${apiResponse.status}`);

    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
