import { Request, Response } from "express";
import Lead from "../models/lead.user";


export const createLead = async (req: Request,res: Response): Promise<void> => {
  try {
    const { name, email, status, source } = req.body;

    const lead = await Lead.create({
      name,
      email,
      status,
      source,
      createdBy: req.user.id,
    });

    res.status(201).json({success: true,data: lead});

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create lead",
    });
  }
};

export const getLeads = async (req: Request,res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = 10;

    const skip = (page - 1) * limit;

    const status = req.query.status as string;
    const source = req.query.source as string;
    const search = req.query.search as string;

    const query: Record<string, any> = {};

    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const total = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,

      data: leads,

      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};

export const getSingleLead = async (req: Request,res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404).json({success: false,message: "Lead not found",});
      return;
    }
    res.status(200).json({success: true,data: lead,});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lead",
    });
  }
};

export const updateLead = async (req: Request,res: Response): Promise<void> => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id,req.body);

    if (!updatedLead) {
      res.status(404).json({success: false,message: "Lead not found"});
      return;
    }

    res.status(200).json({success: true,data: updatedLead});

  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Failed to update lead"});
  }
};

export const deleteLead = async (req: Request,res: Response): Promise<void> => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);

    if (!deletedLead) {
      res.status(404).json({success: false,message: "Lead not found"});
      return;
    }

    res.status(200).json({success: true, message: "Lead deleted successfully"});

  } catch (error) {
    console.error(error);

    res.status(500).json({ success: false, message: "Failed to delete lead"});
  }
};