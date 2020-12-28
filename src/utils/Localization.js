////////////////////////////////////////
///
///     Localization.js
///
////////////////////////////////////////
///    Simple localization
////////////////////////////////////////

const { ErrorLog } = require('./Log');
const settings = require('../../settings.json');

const locale = (lang, data) => {
    const langData = require(`../../locales/${lang}.json`);

    if (langData) {
        return langData[data];
    } else {
        const defaultLangData = require(`../../locales/${settings}`);

        ErrorLog(
            'Language file not found. Language paramater and language file must be equal'
        );
        return defaultLangData[data];
    }
};

module.exports = locale;
