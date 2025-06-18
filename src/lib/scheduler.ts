import cron from 'node-cron';
import axios from 'axios';

cron.schedule('*/10 * * * *', async () => {
    console.log('🔁 update every 10 minutes');
    await axios.post('http://localhost:3000/api/update');
});
