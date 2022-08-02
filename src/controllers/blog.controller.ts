import { Request, Response } from "express";
import { UserInfosTypes } from '../dto/user.types'
import { hash } from "bcrypt";
import { db } from "../db/credentials";
class BlogController {
  async registerUser(req: Request, res: Response) {
    try {
      const {
        firstName,
        lastName,
        age,
        email,
        profession,
        password,
        confirmPassword,
      }: UserInfosTypes = req.body;

      const passwordHash = await hash(password, 10);
      const userJson = {
        firstName,
        lastName,
        age,
        email,
        profession,
        password: passwordHash,
        confirmPassword: passwordHash,
      };

      if (password !== confirmPassword) {
        res.status(402).send({ message: "Senhas incompativeis!" });
        return;
      }

      const response = await db.collection("users").add(userJson);
      res.status(201).send(response);
    } catch (error: any) {
      res.status(404).send({ message: "Error" + error });
    }
  }

  async showUsers(req: Request, res: Response) {
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
  }

  async userId(req: Request, res: Response) {
    try {
      const userRef = db.collection("users").doc(req.params.id);
      const response = await userRef.get();
      res.status(200).send(response.data());
    } catch (error: any) {
      res.status(404).send({ message: "Error" + error });
    }
  }

  async editUser(req: Request, res: Response) {
    try {
      const {
        firstName,
        lastName,
        age,
        email,
        profession,
        password,
        confirmPassword,
      }: UserInfosTypes = req.body;

      const passwordHash = await hash(password, 10);

      const userJson = {
        firstName,
        lastName,
        age,
        email,
        profession,
        password: passwordHash,
        confirmPassword: passwordHash,
      };

      if (password !== confirmPassword) {
        res.status(402).send({ message: "Senhas incompativeis!" });
        return;
      }

      const userRef = await db
        .collection("users")
        .doc(req.params.id)
        .update(userJson);

      res.status(201).send(userRef);
    } catch (error: any) {
      res.status(404).send({ message: "Error" + error });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const response = await db.collection("users").doc(req.params.id).delete();
      res.status(204).send({
        message: "Usuário deletado!",
        response,
      });
    } catch (error: any) {
      res.status(404).send({ message: "Error" + error });
    }
  }
}

export { BlogController };

// const registerUser = async (req: Request, res: Response) => {
//   const {
//     firstName,
//     lastName,
//     age,
//     email,
//     profession,
//     password,
//     confirmPassword,
//   } = req.body;
//   try {
//     const passwordHash = await hash(password, 10);
//     const userJson = {
//       firstName,
//       lastName,
//       age,
//       email,
//       profession,
//       password: passwordHash,
//       confirmPassword,
//     };

//     if (password !== confirmPassword) {
//       res.status(402).send({ message: "Senhas incompativeis!" });
//       return;
//     }

//     const response = await db.collection("users").add(userJson);
//     res.status(201).send(response);
//   } catch (error: any) {
//     res.status(404).send({ message: "Error" + error });
//   }
// };

// const showUsers = async (req: Request, res: Response) => {
//   try {
//     const usersRef = db.collection("users");
//     const response = await usersRef.get();
//     let arrayData: any = [];
//     response.forEach((doc) => {
//       arrayData.push(doc.data());
//     });
//     res.status(200).send(arrayData);
//   } catch (error: any) {
//     res.status(404).send({ message: "Error" + error });
//   }
// };

// const UserId = async (req: Request, res: Response) => {
//   try {
//     const userRef = db.collection("users").doc(req.params.id);
//     const response = await userRef.get();
//     res.status(200).send(response.data());
//   } catch (error: any) {
//     res.status(404).send({ message: "Error" + error });
//   }
// };

// const editUser = async (req: Request, res: Response) => {
//   try {
//     const userJson = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       age: req.body.age,
//       email: req.body.email,
//       profession: req.body.profession,
//       password: req.body.password,
//       confirmPassword: req.body.confirmPassword,
//     };

//     if (userJson.password !== userJson.confirmPassword) {
//       res.status(402).send({ message: "Senhas incompativeis!" });
//       return;
//     }

//     const userRef = await db
//       .collection("users")
//       .doc(req.params.id)
//       .update(userJson);
//     res.status(201).send(userRef);
//   } catch (error: any) {
//     res.status(404).send({ message: "Error" + error });
//   }
// };

// const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const response = await db.collection("users").doc(req.params.id).delete();
//     res.status(204).send({
//       message: "Usuário deletado!",
//       response,
//     });
//   } catch (error: any) {
//     res.status(404).send({ message: "Error" + error });
//   }
// };

// export = {
//   registerUser,
//   showUsers,
//   UserId,
//   editUser,
//   deleteUser,
// };
