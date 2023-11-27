const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming there's a 'User' model to reference
        required: true
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming there's a 'User' model to reference
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
