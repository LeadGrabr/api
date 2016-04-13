import Lead from './model'

/**
 * Load lead and append to req.
 */
function load(req, res, next, id) {
    Lead.get(id).then((lead) => {
        req.lead = lead        // eslint-disable-line no-param-reassign
        return next()
    }).error((err) => next(err))
}

/**
 * Get lead
 * @returns {Lead}
 */
function get(req, res) {
    return res.json(req.lead)
}

/**
 * Create new lead
 * @property {string} req.body.leadname - The leadname of lead.
 * @property {string} req.body.mobileNumber - The mobileNumber of lead.
 * @returns {Lead}
 */
function create(req, res, next) {
    const lead = new Lead({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })

    lead.saveAsync()
        .then((savedLead) => res.json(savedLead))
        .error((err) => next(err))
}

// /**
//  * Update existing lead
//  * @property {string} req.body.leadname - The leadname of lead.
//  * @property {string} req.body.mobileNumber - The mobileNumber of lead.
//  * @returns {Lead}
//  */
// function update(req, res, next) {
//     const lead = req.lead
//     lead.leadname = req.body.leadname
//     lead.mobileNumber = req.body.mobileNumber

//     lead.saveAsync()
//         .then((savedLead) => res.json(savedLead))
//         .error((err) => next(err))
// }

/**
 * Get lead list.
 * @property {number} req.query.skip - Number of leads to be skipped.
 * @property {number} req.query.limit - Limit number of leads to be returned.
 * @returns {Lead[]}
 */
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query
    Lead.list({ limit, skip }).then((leads) => res.json(leads))
        .error((err) => next(err))
}

// /**
//  * Delete lead.
//  * @returns {Lead}
//  */
// function remove(req, res, next) {
//     const lead = req.lead
//     lead.removeAsync()
//         .then((deletedLead) => res.json(deletedLead))
//         .error((err) => next(err))
// }

export default { load, get, create, list }
