const { Schema, Types } = require('mongoose');
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        
        reactionBody: {
            type: String, 
            required: true,
            maxlength: 285
        },

        username: {
            type: String,
            required: trusted,
        },
        
        createdAt: {
            type: Date, 
            default: Date.now(),
            get: (val) => Date(val).toString(),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);


module.exports = reactionSchema;