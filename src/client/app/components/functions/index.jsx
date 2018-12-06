import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';

/**
 * Remove accent marks
 * @param {string} str - String to remove accents
 * @returns {string}
 */
const RemoveAccent = (str) => {
    let res = str;
    res = res.toLowerCase();
    res = res.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    res = res.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    res = res.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    res = res.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    res = res.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    res = res.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    res = res.replace(/đ/g, 'd');
    return res;
};

/**
 * Remove spaces
 * @param {string} str - String to remove spaces
 * @returns {string}
 */
const RemoveSpace = (str) => {
    let res = str;
    res = res.replace(/\s+/g, ' ');
    return res.trim();
};

/**
 * Turn a string to url format
 * @param {string} str - String to turn to URL
 * @returns {string}
 */
const toUrl = (str) => {
    let res = str;
    res = RemoveAccent(res);
    res = res.replace(/[^0-9a-z\s]/gi, '');
    res = RemoveSpace(res);
    res = res.replace(/\s/g, '-');
    return res;
};

/**
 * Turn newline to break
 */
const Nl2br = ({ text }) => (
    text.split('\n').map((item, key) => (
        <span key={key}>
            {item}
            <br />
        </span>
    ))
);
Nl2br.propTypes = {
    /** Text to turn newline to break */
    text: PropTypes.string,
};

/**
 * Render noscript element
 */
const NoScript = ({ children }) => {
    const staticMarkup = ReactDOMServer.renderToStaticMarkup(children);
    return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
};

/**
 * Format Date to string
 * @param {Date} Date - Date to format to string
 * @returns {string}
 */
const DateToString = (Date) => {
    let date = Date.getDate();
    let month = Date.getMonth() + 1;
    const year = Date.getFullYear();
    date = date < 10 ? `0${date}` : date;
    month = month < 10 ? `0${month}` : month;
    return `${date}/${month}/${year}`;
};

/**
 * Format Date to string with time
 * @param {Date} Date - Date to format to string with time
 * @returns {string}
 */
const DateTimeToString = (Date) => {
    let day = Date.getDay() + 1;
    let date = Date.getDate();
    let month = Date.getMonth() + 1;
    const year = Date.getFullYear();
    let hours = Date.getHours();
    let minutes = Date.getMinutes();
    day = day === 1 ? 'Chủ nhật' : `Thứ ${day}`;
    date = date < 10 ? `0${date}` : date;
    month = month < 10 ? `0${month}` : month;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${day}, ${date}/${month}/${year} ${hours}:${minutes}`;
};

/**
 * Create HTML element from string
 * @param {string} htmlString - String to turn to HTML element
 * @returns {HTMLElement}
 */
const createElementFromHTML = (htmlString) => {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    return div;
};

/**
 * Get parameters from URL string
 * @param {string} name - The name of the parameter
 * @param {string} url - URL string
 * @returns {string} - Value of the parameter
 */
const getParamsFromURL = (name, url) => {
    const regex = new RegExp(`[?&]${name.replace(/[[\]]/g, '\\$&')}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export {
    RemoveAccent,
    RemoveSpace,
    toUrl,
    Nl2br,
    NoScript,
    DateToString,
    DateTimeToString,
    createElementFromHTML,
    getParamsFromURL,
};
