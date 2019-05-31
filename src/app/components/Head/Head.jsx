import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export function Head(props) {
    const {
        title,
        description,
        keywords,
        canonical,
        url,
        type,
        imageUrl,
    } = props;

    const WebFontConfig = {
        google: {
            families: ['Roboto'],
        },
    };

    return (
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:type" content={type} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:width" content="900" />
            <meta property="og:image:height" content="603" />
            <title>{title}</title>
            <link rel="canonical" href={canonical} />
            <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" sizes="16x16" />
            <script type="application/javascript">
                {`WebFontConfig = ${JSON.stringify(WebFontConfig)}`}
            </script>
        </Helmet>
    );
}

Head.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    keywords: PropTypes.string.isRequired,
    canonical: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};

export default connect(
    state => ({
        ...state.metadata,
    }),
    () => ({}),
)(Head);
