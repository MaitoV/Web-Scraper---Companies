import mongoose from 'mongoose';

const pagesScrapedCollection = 'pagesScraped';

const pagesScrapedSchema = new mongoose.Schema({
    page: {type: Number, required: true}
})

export default mongoose.model(pagesScrapedCollection, pagesScrapedSchema);