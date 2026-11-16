import Client from "../models/Client.js";


const createClient = async (req, res) => {
  const { 
    nccClient,
    nomClient, 
    mailClient,
    localClient,
    nubClient,
    diminClient,

    toDate, 
     } = req.body;

    const existingDc = await Client.findOne({
     $or: [{ nccClient }, { nccClient }],
        });
    const existingDi = await Client.findOne({
     $or: [{ diminClient }, { diminClient }],
        });

    const existingNc = await Client.findOne({
     $or: [{ nomClient }, { nomClient }],
        });
    
        if (existingDc) {
          return res.status(400).json({
            success: false,
            error:
              existingDc.nccClient = nccClient
                ? `Client ${nccClient} enregistré.`
                : "Client dejà enregistré",
          });

        };

        if (existingDi) {
          return res.status(400).json({
            success: false,
            error:
              existingDi.diminClient = diminClient
                ? `Client ${diminClient} enregistré.`
                : "Client dejà enregistré",
          });

        };

       if (existingNc) {
          return res.status(400).json({
            success: false,
            error:
              existingDi.nomClient = nomClient
                ? `Client ${nomClient} enregistré.`
                : "Client dejà enregistré",
          });

        };

   
  const client = await Client.create({
    
    nccClient,
    nomClient, 
    mailClient,
    localClient,
    nubClient,
    diminClient,

    toDate

  });

  res.status(201).json({
    message: "Client request submitted",
    client
  });
};



const getMyCliens = async (req, res) => {
  const clients = await Client.find().sort({ createdAt: -1 });
  res.json({ clients });
};




const getClientById = async (id) => {
   
    return await Client.findById(id);
   
};




const getMyonClients = async (req, res) => {
 
    try {
        const { id } = req.params;

        const client = await getClientById(id);
        

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






const updateClients = async (req, res) => {
  const { id } = req.params;


  const client = await getClientById(id);

  const { 
    nccClient,
    nomClient, 
    mailClient,
    localClient,
    nubClient,
    diminClient,

    toDate
 } = req.body;

 if (!client) {
    return res.status(404).json({ message: "Client request not found" });
  }


client.nccClient = nccClient;
client.nomClient = nomClient;
client.mailClient = mailClient;
client.localClient = localClient;
client.nubClient = nubClient;
client.diminClient = diminClient;

client.toDate = toDate

  
  await client.save();
  console.log(client)

  res.json({
    client
 });
};


const deleteClient = async (req, res) => {
   const { id } = req.params;


  const client = await getClientById(id);

  await client.deleteOne();
  res.json({ message: "Client deleted" });
};





export {
  createClient,
  getMyCliens,
  getMyonClients,
  updateClients,
  deleteClient
};
