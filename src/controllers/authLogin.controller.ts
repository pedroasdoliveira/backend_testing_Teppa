import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import * as admin from "firebase-admin";
import * as credentials from "../db/key.json";

admin.initializeApp({
  credential: admin.credential.cert(credentials as admin.ServiceAccount),
});

const db = admin.firestore();

class AuthLoginController {
  async execute(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const userEmail = db.collection("users").doc(email);
      const response = await userEmail.get();

      const user = response.data();

      if (!user) {
        return res.status(404).send({ message: "Email or password incorrect" });
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        return res.status(404).send({ message: "Email or password incorrect" });
      }

      const token = sign({}, "chave_secreta", {
        subject: email,
        expiresIn: "1d",
      });
      return token;
    } catch (error: any) {
      res.status(404).send({ message: "Error" + error });
    }
  }
}

export { AuthLoginController };
