/**
 * @file 根据message生成locale文件的方法
 */
import {addLocaleData} from 'react-intl';
import localeEnData from 'react-intl/locale-data/en';
import localeZhData from 'react-intl/locale-data/zh';

const formatMessages: object = (messages: object, type: string = 'other') => (
    Object.entries(messages).reduce((result, [key, value]) => {
        if (typeof value === 'string') {
            return {
                ...result,
                [key]: type === 'zh' ? key : value,
            };
        }

        if (typeof value === 'object') {
            const children = Object.keys(value).reduce((acc, id) => ({
                ...acc,
                [`${key}__orz__${id}`]: type === 'zh' ? key : value[id],
            }), {});

            return {...result, ...children};
        }

        return result;
    }, {})
);

const createLocales: object = (messages: object) => {
    if (typeof messages !== 'object') {
        return {};
    }

    // 考虑到系统中支持除中英文外的语言可能性不大，写死localeData的加载可能比动态加载更合适
    addLocaleData([...localeEnData, ...localeZhData]);

    const targetMessages = Array.isArray(messages)
        ? messages
        : [{language: 'en-US', messages}];

    const otherLocales = targetMessages.reduce((acc, item) => ({
        ...acc,
        [item.language]: formatMessages(item.messages),
    }), {});

    return {
        ...otherLocales,
        'zh-CN': formatMessages(targetMessages[0].messages, 'zh'),
    };
};

export default createLocales;
