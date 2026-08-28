import { modelByRole, roleOrder } from "../utils/roleModels.js";
import generateToken from "../utils/generateToken.js";

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  poste: user.poste
});

const register = async (req, res) => {
  const { name, email, password, role, poste } = req.body;

  for (const currentRole of roleOrder) {
    const exists = await modelByRole[currentRole].findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }
  }

  const newRole = req.user?.role === "admin" && role ? role : "employee";
  const UserModel = modelByRole[newRole];
  const user = await UserModel.create({ name, email, password, role: newRole, poste });

  const token = generateToken(user);

  res.status(201).json({
    message: "Enregistrer",
    token,
    user: sanitizeUser(user)
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  for (const currentRole of roleOrder) {
    const candidate = await modelByRole[currentRole].findOne({ email });
    if (candidate && (await candidate.comparePassword(password))) {
      const token = generateToken(candidate);
      return res.json({
        message: "Connecté",
        token,
        user: sanitizeUser(candidate)
      });
    }
  }

  return res.status(401).json({ message: "Email ou Mot de passe invalide" });
};

const getMe = async (req, res) => {
  res.json({ user: req.user });
};

export { register, login, getMe };
