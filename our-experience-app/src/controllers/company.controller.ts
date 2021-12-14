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
  const csrf_t = req.csrfToken();
  res.render('admin/companies', { title: 'Manage Companies', companies: data[0], csrfToken: csrf_t });
};

const company_details = async (req: Request, res: Response, next: NextFunction) => {
  const jobs:any = await JobPosting.query().where('companyId', '=', req.params.id).withGraphFetched('company');
  const company:any = await Company.query().findById( req.params.id );
  res.render('admin/company', { title: company.name, jobs: jobs});
};

// CRUD
const create_company = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const new_company = await Company.query()
    .insert({
      name: req.body.name
    });

    if(new_company instanceof Company) {
      req.flash('success', `Successfully added: ${new_company.name}`);
    } else {
      throw Error;
    }
  } catch {
    req.flash('error', `Error while attempting to create company: ${req.body.name}`);
  }
  res.redirect('/admin/companies/');



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

export default { get_all_companies, company_details, create_company, delete_company }