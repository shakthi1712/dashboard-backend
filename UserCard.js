// models/UserCard.js
import mongoose from 'mongoose';

const userCardSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const UserCard = mongoose.model('UserCard', userCardSchema);

export default UserCard;
