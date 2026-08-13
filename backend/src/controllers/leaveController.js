import Leave from "../models/Leave.js";

const PENDING_EXPIRY_MS = 2 * 24 * 60 * 60 * 1000;

const expireStalePendingLeaves = async (employeeId = null) => {
  const filter = {
  status: "pending",
   createdAt: { $lt: new Date(Date.now() - PENDING_EXPIRY_MS) }
 };
  

 if (employeeId) {
  filter.employeeId = employeeId; }

 await Leave.updateMany(filter, {
  $set: {
    status: "expired"
  }
 });
};

const createLeave = async (req, res) => {
  const { 
    leaveType, 

    typds,
    annee,
    Idclient,
    nbDoss,

    cetegorie,
    nbDossier,
    client,
    assurance,
    pakliste,
    fournisseur,
    nbOt,
    typeTc,
    nbTc,
    nbltabl,
    nbColis,
    poids,
    desigation,
    factcom,
    bondesortie,
    exportinvoice,


    statutfac,
    montantfac,
    deb_douanes,
    deb_divers,
    montantprest,
    datedepos,
    datesignprof,
    nbfact,
    datefacture,

    dateassur,
    exodate,
    nblettreexo,
    dateexodgd,
    dateexoclient,
    datetiragedecla,
    nbdecla,
    statusregul,
    dateregulclient,
    datebae,



    fromDate,
    toDate, 
    reason } = req.body;

    const existingDc = await Leave.findOne({
     $or: [{ nbDossier }, { nbDossier }],
        });
    
        if (existingDc) {
          return res.status(400).json({
            success: false,
            error:
              existingDc.nbDossier = nbDossier
                ? `DOssier ${nbDossier} enregistré.`
                : "Dossier dejà ouvert",
          });

        };

   


     

  


  await expireStalePendingLeaves(req.user._id);

 //const existingPending = await Leave.findOne({ employeeId: req.user._id, status: "pending" });
 // if (existingPending) {
   // return res.status(400).json({
     // message: "You already have a pending leave request. Please wait for review or expiry after 2 days."
  // });
 // }

  const leave = await Leave.create({
    employeeId: req.user._id,
    employeeName: req.user.name,
    employeeEmail: req.user.email,
    leaveType,

    typds,
    annee,
    Idclient,
    nbDoss,


    cetegorie,
    nbDossier,
    client,
    assurance,
    pakliste,
    fournisseur,
    nbOt,
    typeTc,
    nbTc,
    nbltabl,
    nbColis,
    poids,
    desigation,
    factcom,
    bondesortie,
    exportinvoice,

    statutfac,
    montantfac,
    deb_douanes,
    deb_divers,
    montantprest,
    datedepos,
    datesignprof,
    nbfact,
    datefacture,

    dateassur,
    exodate,
    nblettreexo,
    dateexodgd,
    dateexoclient,
    datetiragedecla,
    nbdecla,
    statusregul,
    dateregulclient,
    datebae,

    fromDate,
    toDate,
    reason
  });


  
  res.status(201).json({
    message: "Leave request submitted",
    leave
  });
};

const getMyLeaves = async (req, res) => {
 await expireStalePendingLeaves(req.user._id);
  const leaves = await Leave.find({ employeeId: req.user._id }).sort({ createdAt: -1 });
  res.json({ leaves });
};

const getMyLeavesa = async (req, res) => {
 await expireStalePendingLeaves(req.user._id);
  const leaves = await Leave.find().sort({ createdAt: -1 });
  res.json({ leaves });
};



const getMyLeaveSummary = async (req, res) => {
  await expireStalePendingLeaves(req.user._id);
  const [pending, approved, rejected] = await Promise.all([
    Leave.countDocuments({ employeeId: req.user._id, status: "pending" }),
    Leave.countDocuments({ employeeId: req.user._id, status: "approved" }),
    Leave.countDocuments({ employeeId: req.user._id, status: "rejected" })
  ]);

  res.json({
    summary: { approved, rejected }
  });
};

const getReviewQueue = async (req, res) => {
  await expireStalePendingLeaves();
  const leaves = await Leave.find({ status: "pending" }).sort({ createdAt: -1 });

  res.json({ leaves });
};

const getManagerAnalytics = async (_req, res) => {
  const [pending, approved, rejected, requests] = await Promise.all([
    Leave.countDocuments({ status: "pending" }),
    Leave.countDocuments({ status: "approved" }),
    Leave.countDocuments({ status: "rejected" }),
    Leave.find({}, "status createdAt").sort({ createdAt: -1 })
  ]);

  res.json({
    summary: { approved, rejected },
    requests: requests.map((leave) => ({
      id: leave._id,
      status: leave.status,
      createdAt: leave.createdAt
    }))
  });
};


const getProductsById = async (id) => {
   
    return await Leave.findById(id);
   
};


 const getMyonLeaves = async (req, res) => {
 
    try {
        const { id } = req.params;

        const leave = await getProductsById(id);
        

        console.log(leave)

        if (!leave) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(leave);
    } catch (e) {
        res.status(500).json({
            message: "Smth wrong, try again",
            error: e.message,
        });
    }
}






 

const updateLeaves = async (req, res) => {
  const { id } = req.params;


  const leave = await getProductsById(id);

  const { 
    leaveType, 
    cetegorie,
    nbDossier,
    client,
    assurance,
    pakliste,
    fournisseur,
    nbOt,
    typeTc,
    nbTc,
    nbltabl,
    nbColis,
    poids,
    desigation,
    factcom,
    bondesortie,
    exportinvoice,

    statutfac,
    montantfac,
    deb_douanes,
    deb_divers,
    montantprest,
    datedepos,
    datesignprof,
    nbfact,
    datefacture,

    dateassur,
    exodate,
    nblettreexo,
    dateexodgd,
    dateexoclient,
    datetiragedecla,
    nbdecla,
    statusregul,
    dateregulclient,
    datebae,

    reason } = req.body;

 if (!leave) {
    return res.status(404).json({ message: "Leave request not found" });
  }


leave.leaveType = leaveType;
leave.cetegorie = cetegorie;
leave.nbDossier =nbDossier;
leave.client = client;
leave.assurance = assurance;
leave.pakliste = pakliste;
leave.fournisseur = fournisseur;
leave.nbOt = nbOt;
leave.typeTc = typeTc;
leave.nbTc = nbTc;
leave.nbltabl = nbltabl;
leave.nbColis = nbColis;
leave.poids = poids;
leave.desigation = desigation;
leave.factcom = factcom;
leave.bondesortie = bondesortie;
leave.exportinvoice = exportinvoice;

leave.statutfac = statutfac;
leave.montantfac = montantfac;
leave.deb_douanes = deb_douanes;
leave.deb_divers = deb_divers;
leave.montantprest = montantprest;
leave.datedepos = datedepos;
leave.datesignprof = datesignprof;
leave.nbfact = nbfact;
leave.datefacture  = datefacture;

leave.dateassur = dateassur;
leave.exodate = exodate;
leave.nblettreexo = nblettreexo;
leave.dateexodgd = dateexodgd;
leave.dateexoclient = dateexoclient;
leave.datetiragedecla = datetiragedecla;
leave.nbdecla = nbdecla;
leave.statusregul = statusregul;
leave.dateregulclient = dateregulclient;
leave.datebae = datebae;

leave.reason = reason;
  

  
  await leave.save();
  console.log(leave)

  res.json({
    leave
 });
};



const updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status, managerComment } = req.body;

  await expireStalePendingLeaves();

  const leave = await Leave.findById(id);
  if (!leave) {
    return res.status(404).json({ message: "Leave request not found" });
  }

 if (leave.status !== "pending") {
   const message =
     leave.status === "expired" ? "Leave request expired after 2 days and can no longer be reviewed." : "Leave already reviewed";
   return res.status(400).json({ message });
 }

  leave.status = status;
  leave.managerComment = managerComment || "";
  leave.reviewedById = req.user._id;
  leave.reviewedByName = req.user.name;
  await leave.save();

  res.json({
    message: `Leave ${status}`,
    leave
  });
};

const getAnalytics = async (_req, res) => {
  const [ totalLeaves,  Maritimes, Aeriens, Terrestres, Prestations] =
    await Promise.all([
      Leave.countDocuments(),
      Leave.countDocuments({leaveType: "Maritime"}),
      Leave.countDocuments({leaveType: "Aerien"}),
      Leave.countDocuments({leaveType: "Terrestre"}),
      Leave.countDocuments({leaveType: "Prestation"})
    ]);

  const totalDossier = Maritimes + Aeriens + Terrestres + Prestations;
  
  
  res.json({
    totals: { Maritimes, Aeriens, Terrestres, Prestations, totalDossier },
    leaves: {
      total: totalLeaves,
      Maritime: Maritimes,
      Aerien: Aeriens,
      Terrestre: Terrestres,
      Prestation: Prestations
    },
  
  });
};

export {
  createLeave,
  getMyLeaves,
  getMyonLeaves,
  updateLeaves,
  getMyLeavesa,
  getMyLeaveSummary,
  getReviewQueue,
  getAnalytics,
  getManagerAnalytics,
  updateLeaveStatus
};
