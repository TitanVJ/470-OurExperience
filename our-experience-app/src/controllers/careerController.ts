import { Request, Response, NextFunction } from 'express';
import { Document } from '../models/document.model';
import { ApplicationDocument } from '../models/application_document.model';
import { JobApplication } from '../models/job_application.model';
import { JobPosting } from '../models/job_posting.model';

const getJobApply = async (req: Request, res: Response, next: NextFunction) => {
  const job: any = await JobPosting.query().findById(req.params.id).withGraphFetched('company');
  const userDocuments: Document[] = await Document.query().where('userId', req.user.id);
  const formTypes: any = {
    resume: [],
    coverLetter: [],
    transcript: [],
    sis: []
  };
  userDocuments.forEach((document: Document) => {
    if (document.documentType === 'resume') {
      formTypes.resume.push(document);
    } else if (document.documentType === 'cover-letter') {
      formTypes.coverLetter.push(document);
    } else if (document.documentType === 'transcript') {
      formTypes.transcript.push(document);
    } else if (document.documentType === 'sis') {
      formTypes.sis.push(document);
    }
  });
  res.render('application', { title: `${job.title} - ${job.company.name}`, job: job, formTypes: formTypes });
};

const postJobApply = async (req: Request, res: Response, next: NextFunction) => {
  const jobID = +req.params.id;
  const { resumeId, coverLetterId, transcriptId, sisId } = req.body;
  const reqBody = [resumeId, coverLetterId, transcriptId, sisId];

  try {
    //create job application
    const newApplication: JobApplication = await JobApplication.query().insert({ postingId: jobID, userId: req.user.id });

    for (let fileId of reqBody) {
      if (fileId) {
        const insert = {
          applicationId: newApplication.id,
          documentId: fileId
        };
        const result = await ApplicationDocument.query().insert(insert);
      }
    }
    req.flash('success', 'application success');
    res.redirect(`/career/job/${jobID}`);
  } catch (error) {
    next(error);
  }
};

export default {
  getJobApply,
  postJobApply
};
