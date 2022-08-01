import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as credentials from "../db/key.json";

admin.initializeApp({
  credential: admin.credential.cert(credentials as admin.ServiceAccount),
});

const db = admin.firestore();

const registerUser = async (req: Request, res: Response) => {
  try {
    const userJson = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      profession: req.body.profession,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    if (userJson.password !== userJson.confirmPassword) {
      res.status(402).send({ message: "Senhas incompativeis!" });
      return;
    }

    const response = await db.collection("users").add(userJson);
    res.status(201).send(response);
  } catch (error: any) {
    res.status(404).send({ message: "Error" + error });
  }
};

const showUsers = async (req: Request, res: Response) => {
  try {
    const usersRef = db.collection("users");
    const response = await usersRef.get();
    let arrayData: any = [];
    response.forEach((doc) => {
      arrayData.push(doc.data());
    });
    res.status(200).send(arrayData);
  } catch (error: any) {
    res.status(404).send({ message: "Error" + error });
  }
};

export = {
  registerUser,
  showUsers,
};
