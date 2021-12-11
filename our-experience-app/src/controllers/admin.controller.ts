import { Request, Response, NextFunction } from 'express';

const dashboard = (req: Request, res: Response, next: NextFunction) => {
    res.render('admin_dashboard', {title: 'Administrator Dashboard'});
};

export default { dashboard }