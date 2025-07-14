// backend/models/Timer.js
import mongoose from 'mongoose';

const TimerSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  hours: {
    type: Number,
    default: 0
  },
  minutes: {
    type: Number,
    default: 0
  },
  seconds: {
    type: Number,
    default: 0
  },
  running: {
    type: Boolean,
    default: false
  },
  lastStartTime: {
    type: Date
  }
});

const Timer = mongoose.model('Timer', TimerSchema);

export default Timer;
