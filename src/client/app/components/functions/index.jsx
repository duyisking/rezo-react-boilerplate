import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Remove accent marks
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

// Remove useless space
const RemoveSpace = (str) => {
    let res = str;
    res = res.replace(/\s+/g, ' ');
    return res.trim();
};

// Turn a string to url format
const toUrl = (str) => {
    let res = str;
    res = RemoveAccent(res);
    res = res.replace(/[^0-9a-z\s]/gi, '');
    res = RemoveSpace(res);
    res = res.replace(/\s/g, '-');
    return res;
};

// Turn newline to break
const Nl2br = ({ text }) => (
    text.split('\n').map((item, key) => (
        <span key={key}>
            {item}
            <br />
        </span>
    ))
);


const NoScript = ({ children }) => {
    const staticMarkup = ReactDOMServer.renderToStaticMarkup(children);
    return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
};

const DateToString = (Date) => {
    let date = Date.getDate();
    let month = Date.getMonth() + 1;
    const year = Date.getFullYear();
    date = date < 10 ? `0${date}` : date;
    month = month < 10 ? `0${month}` : month;
    return `${date}/${month}/${year}`;
};

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

const createElementFromHTML = (htmlString) => {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    return div;
};

const cloudinaryImage = (url, query) => {
    if (url.match('cloudinary.com')) {
        return url.replace(/upload\/[\w,_]+\//, `upload/${query}/`);
    }
    return url;
};

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
    cloudinaryImage,
    getParamsFromURL,
};
