const { Schema, model, Types } = require('mongoose');

// Schema to create User model
const reactionSchema = new Schema(
    {
        reactionId: {
            //Use Mongoose's objectId data type
            type:Schema.Types.ObjectId,
            //default value is set to a new Object Id
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            require: true,
            maxlength: 280,
        },
        username: {
            type: String, 
            require: true,
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            //Use getter method to format the timestamp on query
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
)

const thoughtSchema = new Schema(
  {
    thoughtText: {
        type:String, 
        require: true,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //Use a getter method to format the timestamp on query
    },
    username: {
        type: String, 
        require: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought;