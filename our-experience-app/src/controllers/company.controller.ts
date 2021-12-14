import { Request, Response, NextFunction } from 'express';
import { Company } from '../models/company.model';
import { JobPosting } from '../models/job_posting.model';

const get_all_companies = async (req: Request, res: Response, next: NextFunction) => {
  const knex = Company.knex();
  const data = await knex.raw(` select id, name, (
                                select count(*)
                                from JobPosting
                                where JobPosting.companyId = Company.id
                                ) as "numPosts"
                                from Company;`
                              );
  console.log(data[0]);
  res.render('admin/companies', { title: 'Manage Companies', companies: data[0] });
};

const company_details = (req: Request, res: Response, next: NextFunction) => {
  res.send('company\n'+ req.params.id);
};

const company_data = (req: Request, res: Response, next: NextFunction) => {

};

// CRUD
const create_company = (req: Request, res: Response, next: NextFunction) => {

};

const delete_company = async (req: Request, res: Response, next: NextFunction) => {
  const company:any = await Company.query().findById( req.body.id );
  try{
    await Company.query().deleteById( req.body. id);

    req.flash('success', `Removed ${company.name}`);
  } catch (error) {
    console.error(error);
    req.flash('error', `Error removing ${company.name}: Cannot remove company with job posts`);
  }
  res.redirect('/admin/companies');
};

const update_company = (req: Request, res: Response, next: NextFunction) => {

};

export default { get_all_companies, company_details, company_data, create_company, delete_company, update_company }