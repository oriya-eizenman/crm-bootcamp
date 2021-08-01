const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new mongoose.Schema(
    {
        accountId: {
            type: Schema.Types.String,
            trim: true,
            required: true,
            // max: 30,
            index: true,
            default: 1
            // lowercase: true
        },
        leadEmail: {
            type: Schema.Types.String,
            trim: true,
            required: true,
            max: 30,
            index: true,
            lowercase: true
        },
        leadName: {
            type: Schema.Types.String,
            trim: true,
            required: true,
            max: 30,
            lowercase: true
        },
        roomId: {
            type: Schema.Types.String,
            trim: true,
            required: true,
            // max: 30,
            // lowercase: true
        },
        messages: {
            type: Schema.Types.Mixed,
            required: true,
            default: []
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        deleted: {
            type: Schema.Types.Boolean, default: false,
            required: true,
            //  unique: true /**works only when db isn't created yet. (auto-index) */
        },
    },
    { _id: true, timestamps: true, collection: 'chat', autoIndex: true }
);

/**In Mongoose, a virtual is a property that is not stored in MongoDB. Virtual are typically used for computed properties on documents. */

chatSchema.methods = {
    UnDelete: function () {
        return this.deleted = false;
    },

    Delete: function () {
        return this.deleted = true;
    }
};



module.exports = mongoose.model('chat', chatSchema);
