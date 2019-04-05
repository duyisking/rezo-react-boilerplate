import express from 'express'; // eslint-disable-line no-unused-vars
import renderer from './renderer';

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const index = (req, res) => {
    renderer(req, res, 'index', {
        title: 'Home Page',
        description: 'This is the Home Page',
        keywords: 'home',
        canonical: '',
        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
        type: 'website',
        imageUrl: '',
    });
};

export {
    index,
};
