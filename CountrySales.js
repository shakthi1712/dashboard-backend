
import mongoose from 'mongoose';

const countrySalesSchema = new mongoose.Schema({
    country: String,
    sales: Number,
    date: { type: Date, default: Date.now }
});

const CountrySales = mongoose.model('CountrySales', countrySalesSchema);

export default CountrySales;
