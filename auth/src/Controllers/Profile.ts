import {
  addProfileImage,
  ProfileDetails,
  coverphoto,
  profileextra,
  findallusers,
  follwdetails,
  usersprofile,
  fetchusers,
  followingmembers,
  followermembers,
  logineduser,
  getusers,
  searchengine,
} from "../Models/userModel";
import { json, Request, Response } from "express";

export const profilephoto = async (req: Request, res: Response) => {
  try {
    const response = await addProfileImage(req.body);
    res.status(200).json("profileupdated");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const profileDetails = async (req: Request, res: Response) => {
  try {
    const response = await ProfileDetails(req.body.user.id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};

export const coverphotos = async (req: Request, res: Response) => {
  try {
    const response = await coverphoto(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
export const profileextradata = async (req: Request, res: Response) => {
  try {
    const response = await profileextra(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
export const allusers = async (req: Request, res: Response) => {
  try {
    const response = await findallusers(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
export const follow = async (req: Request, res: Response) => {
  try {
    const response = await follwdetails(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
export const userprofile = async (req: Request, res: Response) => {
  try {
    const response = await usersprofile(req.body.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
export const fetchalluser = async (req: Request, res: Response) => {
  try {
    const response = await fetchusers(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
export const followinguser = async (req: Request, res: Response) => {
  try {
    const response = await followingmembers(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
export const followuser = async (req: Request, res: Response) => {
  try {
    const response = await followermembers(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
export const loginuser = async (req: Request, res: Response) => {
  try {
    const response = await logineduser(req.body.user.id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await getusers(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
export const searchdata = async (req: Request, res: Response) => {
  try {
    const response = await searchengine(req.body.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};
