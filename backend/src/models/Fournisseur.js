import mongoose from "mongoose";

 

const leaveSchema = new mongoose.Schema(
 {
    nccFournis: { type: String, default: "" },
    nomFournis: { type: String, default: "" },
    mailFournis: { type: String, default: "" },
    localFournis: { type: String, default: "" },
    nubFournis: { type: String, default: "" },
    diminFournis: { type: String, default: "" },

    toDate: {
      type: Date,
      default: ""
    },

  },
  { timestamps: true }
);

const Fournisseur = mongoose.model("Fournisseur", leaveSchema);
export default Fournisseur;
