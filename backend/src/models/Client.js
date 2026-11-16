import mongoose from "mongoose";

 

const leaveSchema = new mongoose.Schema(
 {
    nccClient: { type: String, default: "" },
    nomClient: { type: String, default: "" },
    mailClient: { type: String, default: "" },
    localClient: { type: String, default: "" },
    nubClient: { type: String, default: "" },
    diminClient: { type: String, default: "" },

    toDate: {
      type: Date,
      default: ""
    },

  },
  { timestamps: true }
);

const Client = mongoose.model("Client", leaveSchema);
export default Client;
