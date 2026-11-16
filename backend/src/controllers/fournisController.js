import Fournisseur from "../models/Fournisseur.js";


const createFournis = async (req, res) => {
  const { 
    nccFournis,
    nomFournis, 
    mailFournis,
    localFournis,
    nubFournis,
    diminFournis,

    toDate, 
     } = req.body;

    const existingDc = await Fournisseur.findOne({
     $or: [{ nccFournis }, { nccFournis }],
        });
    const existingDi = await Fournisseur.findOne({
     $or: [{ diminFournis }, { diminFournis}],
        });

    const existingNc = await Fournisseur.findOne({
     $or: [{ nomFournis }, { nomFournis }],
        });
    
        if (existingDc) {
          return res.status(400).json({
            success: false,
            error:
              existingDc.nccFournis = nccFournis
                ? `Client ${nccFournis} enregistré.`
                : "Client dejà enregistré",
          });

        };

        if (existingDi) {
          return res.status(400).json({
            success: false,
            error:
              existingDi.diminFournis = diminFournis
                ? `Client ${diminFournis} enregistré.`
                : "Client dejà enregistré",
          });

        };

       if (existingNc) {
          return res.status(400).json({
            success: false,
            error:
              existingDi.nomFournis = nomFournis
                ? `Client ${nomFournis} enregistré.`
                : "Client dejà enregistré",
          });

        };

   
  const client = await Fournisseur.create({
    
    nccFournis,
    nomFournis, 
    mailFournis,
    localFournis,
    nubFournis,
    diminFournis,

    toDate

  });

  res.status(201).json({
    message: "Client request submitted",
    client
  });
};



const getMyFournis = async (req, res) => {
  const clients = await Fournisseur.find().sort({ createdAt: -1 });
  res.json({ clients });
};




const getFournisById = async (id) => {
   
    return await Fournisseur.findById(id);
   
};




const getMyonFournis = async (req, res) => {
 
    try {
        const { id } = req.params;

        const client = await getFournisById(id);
        

        console.log(client)

        if (!client) {
            res.status(404).json({ message: "Client not found" });
            return;
        }
        res.status(200).json(client);
    } catch (e) {
        res.status(500).json({
            message: "Smth wrong, try again",
            error: e.message,
        });
    }
}






const updateFournis = async (req, res) => {
  const { id } = req.params;


  const client = await getFournisById(id);

  const { 
    nccFournis,
    nomFournis, 
    mailFournis,
    localFournis,
    nubFournis,
    diminFournis,

    toDate
 } = req.body;

 if (!client) {
    return res.status(404).json({ message: "Client request not found" });
  }


client.nccFournis = nccFournis;
client.nomFournis = nomFournis;
client.mailFournis = mailFournis;
client.localFournis = localFournis;
client.nubFournis = nubFournis;
client.diminFournis = diminFournis;

client.toDate = toDate

  
  await client.save();
  console.log(client)

  res.json({
    client
 });
};


const deleteFournis = async (req, res) => {
   const { id } = req.params;


  const client = await getFournisById(id);

  await client.deleteOne();
  res.json({ message: "Client deleted" });
};





export {
  createFournis,
  getMyFournis,
  getMyonFournis,
  updateFournis,
  deleteFournis
};
