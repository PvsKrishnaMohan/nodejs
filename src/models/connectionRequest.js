const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required : true,
      enum: {
        values: ["ignored", "intrested", "rejected", "accepted"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.pre('save', function(next) {
    const connectionReq = this;
    // console.log(connectionReq)
    if (connectionReq.fromUserId.equals(connectionReq.toUserId)) {
        throw new Error("you cannot send request to you")
    }
    next();
})

const connectionRequestModel = new mongoose.model(
  "connectionRequestSchema",
   connectionRequestSchema
);

module.exports = connectionRequestModel;