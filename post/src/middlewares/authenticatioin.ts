import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifytoken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.headers.token,"post")
  const token: any = req.headers.token;
  console.log(token, "post token");
  const secret: string | undefined = process.env.JWT_SECRET_KEY;
  if (secret) {
    verify(token, secret, (err: any, decode: any) => {
      if (err) {
        return res.sendStatus(401);
      } else {
        req.body.user = {};
        console.log(req.body.user);
      }
      console.log(decode, "deco");
      const { _id, email } = decode;
      console.log(_id, email);
      req.body.user.id = _id;
      req.body.user.email = email;
      console.log(req.body, "kkkk");
      next();
    });
  }
};
