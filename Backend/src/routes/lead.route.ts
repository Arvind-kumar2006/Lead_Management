import express from "express";

import {createLead,deleteLead,getLeads,getSingleLead,updateLead,} from "../controller/lead.controller";

import { protect } from "../middleware/user.middleware";

import { authorizeRoles } from "../middleware/role.middleware";

const router = express.Router();

router.get("/", protect, getLeads);

router.get("/:id", protect, getSingleLead);

router.post("/",protect,createLead);

router.put("/:id",protect,updateLead);

router.delete("/:id",protect,authorizeRoles("admin"),deleteLead);

export default router;