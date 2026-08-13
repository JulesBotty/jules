import mongoose from "mongoose";

 

const leaveSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, required: true },
    employeeName: { type: String, required: true },
    employeeEmail: { type: String, required: true },
    leaveType: {
      type: String,
       default: "",
      required: true
    },

    typds: { type: String, default: ("") },
    annee : { type: String, default: new Date().getFullYear() },
    Idclient : { type: String, default: "" },
    nbDoss : { type: Number, default: "1" },
   

    cetegorie: { type: String, default: "" },
    nbDossier: { type: String, default: "" },
    client: { type: String, default: "" },
    assurance: { type: String, default: "" },
    pakliste: { type: String, default: "" },
    fournisseur: { type: String, default: "" },
    nbOt: { type: String, default: "" },

    typeTc: { type: String, default: "" },
    nbTc: { type: String, default: "" },

    nbltabl: { type: String, default: "" },
    nbColis: { type: String, default: "" },
    desigation: { type: String, default: "" },
    poids: { type: String, default: "" },
    factcom: { type: String, default: "" },
    bondesortie: { type: String, default: "" },
    exportinvoice: { type: String, default: "" },

    statutfac: { type: String, default: "" },
    montantfac: { type: String, default: "" },
    deb_douanes: { type: String, default: "" },
    deb_divers: { type: String, default: "" },
    montantprest: { type: String, default: "" },
    datedepos: { type: String, default: "" },
    datesignprof: { type: String, default: "" },
    nbfact: { type: String, default: "" },
    datefacture: { type: String, default: "" },

    dateassur: { type: String, default: "" },
    exodate: { type: String, default: "" },
    nblettreexo: { type: String, default: "" },
    dateexodgd: { type: String, default: "" },
    dateexoclient: { type: String, default: "" },
    datetiragedecla: { type: String, default: "" },
    nbdecla: { type: String, default: "" },
    statusregul: { type: String, default: "" },
    dateregulclient: { type: String, default: "" },
    datebae: { type: String, default: "" },

    fromDate: {
      type: Date,
      required: true
    },
    toDate: {
      type: Date,
      default: ""
    },
    reason: {
      type: String,
      default: "",
      trim: true
    },
    status: {
      type: String,
      default: "",
      trim: true
    },
    reviewedById: { type: mongoose.Schema.Types.ObjectId, default: null },
    reviewedByName: { type: String, default: "" },
    managerComment: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
