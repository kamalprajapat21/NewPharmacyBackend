// routes/logoutRoutes.js
import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    //if (err) {
    //    return res.status(500).json({ message: 'Failed to log out' });
    //}
    res.status(200).json({ message: 'Logged out successfully' });
  //req.session.destroy(err => {
  //  if (err) {
  //    return res.status(500).json({ message: 'Failed to log out' });
  //  }
  //  //res.clearCookie('connect.sid'); // Adjust if your session cookie name is different
  //  res.status(200).json({ message: 'Logged out successfully' });
  //});
});

export default router;
