import { Request, Response, NextFunction } from 'express';
import { Company } from '../models/company.model';
import { JobPosting } from '../models/job_posting.model';

const dashboard = async (req: Request, res: Response, next: NextFunction) => {
    const company_c: any = await Company.query().select(
        Company.query().count().as('count')
    );
    const job_c:any = await JobPosting.query().select(
        JobPosting.query().count().as('count')
    );

    const payload = { c_count: company_c[0].count, j_count: job_c[0].count };
    res.render('admin/dashboard', {title: 'Administrator Dashboard', stats: payload });
};

export default { dashboard }