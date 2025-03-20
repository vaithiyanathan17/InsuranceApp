import {Router} from 'express';
import PolicyModel  from './models/policy-model.js';
import { QueryParams, DEFAULT_PAGE, DEFAULT_LIMIT } from './types.js';
import { getNavigation, getPaginatorOptions } from './paginator.js';
export const router = Router();

router.get('/insurances', (req, res, next)=>{
    try{
        const queries = req.query;
        const fetchedPolicies =  PolicyModel.getAllPolicies(queries as QueryParams);
        const paginationLinks = getPaginatorOptions(req.originalUrl, (queries.page || DEFAULT_PAGE) as number, (queries.limit || DEFAULT_LIMIT) as number);
        const { pagination, links } = getNavigation(
			fetchedPolicies.totalCount as number,
			fetchedPolicies.data.length,
			paginationLinks,
            (queries.limit || DEFAULT_LIMIT) as number
		);
        console.log(fetchedPolicies, 'fetched policies $$$$$$$$')
        res.status(200).send({pagination, links, data: fetchedPolicies.data});
    } catch(error) {
        if(error.message === "Database connection is closed") {
            res.status(503).send(`service unavailable ${error.message}`);
        }
        res.status(500).send('Serving request error');
    }
})
