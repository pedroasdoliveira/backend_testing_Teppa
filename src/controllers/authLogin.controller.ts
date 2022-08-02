import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import { collection, query, where, getDocs } from "firebase/firestore";
import { UserLogin } from '../dto/login.types'
import { sign } from "jsonwebtoken";
import { db } from '../db/credentials'
class AuthLoginController {
  async execute(req: Request, res: Response) {
    try {
      const emailRef = db.collection('users')
      const snapshot = await emailRef.where('email', "==", req.body.email).get()

      if (snapshot.empty) {
        res.status(404).send({message: 'Error aplication'})
      }

      let user: any = []
      snapshot.forEach(doc => {
        user.push(doc.data())
      });
      console.log(user)
      
      if (!user) {
        return res.status(404).send({ message: "Email or password incorrect!" });
      }

      console.log(req.body.password)
      console.log(user.password)

      const passwordMatch = await compare(req.body.password, user[0].password);

      if (!passwordMatch) {
        return res.status(404).send({ message: "Email or password incorrect" });
      }

      const token = sign({}, "secret_key", {
        subject: req.body.email,
        expiresIn: "1d",
      });

      console.log({
        token,
        user
      })

      res.status(200).send({
        token,
        user
      });

      return {token, user}
    }
    catch (error: any) {
      res.status(404).send({ message: "Error" + error });
    }
  }

  // async execute(req: Request, res: Response) {
  //   try {
  //     const { email, password }: UserLogin = req.body;

  //     const userEmail = db.collection("users").doc('KxE8r6sTxhDfZ4kRVsdM');
  //     const response = await userEmail.get();

  //     const user = response.data();
  //     console.log(user)

  //     if (!user) {
  //       return res.status(404).send({ message: "Email or password incorrect!" });
  //     }

  //     const passwordMatch = await compare(password, user.password);

  //     if (!passwordMatch) {
  //       return res.status(404).send({ message: "Email or password incorrect" });
  //     }

  //     const token = sign({}, "chave_secreta", {
  //       subject: email,
  //       expiresIn: "1d",
  //     });

  //     delete user.password;

  //     res.status(200).send({
  //       token,
  //       user
  //     })
  //     return {
  //       token,
  //       user
  //     };
  //   } catch (error: any) {
  //     res.status(404).send({ message: "Error" + error });
  //   }
  // }
}

export { AuthLoginController };
