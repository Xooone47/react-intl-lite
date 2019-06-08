/**
 * @file 封装intl常见场景的高阶组件
 */
import {useContext} from 'react';
import {injectIntl} from 'react-intl';
import {wrapDisplayName} from 'recompose';
import stringify from 'json-stable-stringify';
import {IntlContext} from '../withIntlProvider';

// eslint-disable-next-line no-empty-function
const noop = () => {};

const memoize = fn => {
    const cache = {};

    return (...args) => {
        const key = stringify(args);

        if (cache[key]) {
            return cache[key];
        }

        const result = fn(...args);
        cache[key] = result;

        return result;
    };
};

const getIntlMethodsIn = intl => {
    const {formatMessage, formatDate, formatTime, formatRelative, formatNumber, formatPlural} = intl;

    const typeToFunc = {
        date: formatDate,
        time: formatTime,
        relative: formatRelative,
        number: formatNumber,
        plural: formatPlural,
    };

    const t = (text, values) => {
        const id = Array.isArray(text) ? `${text[0]}__orz__${text[1]}` : text;

        return formatMessage({id}, values);
    };

    const tx = (type, value, options) => {
        const func = typeToFunc[type] || noop;

        return func(value, options);
    };

    return {t, tx};
};

const getIntlMethods = memoize(getIntlMethodsIn);

export const useIntl = () => {
    const {intl} = useContext(IntlContext);

    return getIntlMethods(intl);
};

export default ComponentIn => {
    const ComponentOut = props => {
        const {intl} = props;

        const {t, tx} = getIntlMethods(intl);

        return <ComponentIn {...props} t={t} tx={tx} />;
    };

    ComponentOut.displayName = wrapDisplayName(ComponentIn, 'withIntl');

    return injectIntl(ComponentOut);
};
