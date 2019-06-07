/**
 * @file intl provider组件
 */
import {createContext} from 'react';
import PropTypes from 'prop-types';
import {IntlProvider, injectIntl} from 'react-intl';
import {wrapDisplayName} from 'recompose';
import createLocales from './createLocales';

const IntlContext = createContext(null);

const {Provider} = IntlContext;

const getLocaleData = (language, locales, options) => {
    const currentLanguge = language || options.fallback || navigator.language || navigator.userLanguage;

    const messages = locales[currentLanguge];

    return {
        locale: messages ? currentLanguge : Object.keys(locales)[0],
        messages: messages || Object.values(locales)[0],
    };
};

const Fallback = () => (
    <h2>您的浏览器版本太低，请升级版本以支持国际化！</h2>
);

const IntlCom = injectIntl(
    ({intl, children}) => (
        <Provider value={{intl}}>
            {children}
        </Provider>
    )
);

export {IntlContext};

export default (originMessages, options = {}) => ComponentIn => {
    const locales = createLocales(originMessages);

    const ComponentOut = ({language, ...otherProps}) => {
        if (!window.Intl) {
            return <Fallback />;
        }

        const {locale, messages} = getLocaleData(language, locales, options);

        return (
            <IntlProvider locale={locale} messages={messages}>
                <IntlCom>
                    <ComponentIn {...otherProps} language={locale} />
                </IntlCom>
            </IntlProvider>
        );
    };

    ComponentOut.displayName = wrapDisplayName(ComponentIn, 'withIntlProvider');

    ComponentOut.propTypes = {
        language: PropTypes.string,
    };

    ComponentOut.defaultProps = {
        language: undefined,
    };

    return ComponentOut;
};
