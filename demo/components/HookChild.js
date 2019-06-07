/**
 * @file Hook用法demo
 */
import {useT} from 'react-intl-lite';

const HookChild = ({onToggle}) => {
    const {t, tx} = useT();
    return (
        <div>
            <h2>{t('国际化')} - Hook</h2>
            <div>{t('你好，{name}', {name: 'Allen'})}</div>
            <br />
            <div>{t('我有{num}只大象', {num: 1})}</div>
            <div>{t('我有{num}只大象', {num: 2})}</div>
            <br />
            <div>{t(['成员', 'default'])}</div>
            <div>{t(['成员', 'uppercase'])}</div>
            <div>{t(['成员', 'lowercase'])}</div>
            <div>{t(['成员', 'plural'])}</div>
            <br />
            <div>{tx('date', Date.now())}</div>
            <div>{tx('time', Date.now())}</div>
            <div>{tx('relative', Date.now() - 6000)}</div>
            <div>{tx('number', 20000000)}</div>
            <div>{tx('plural', 3, {style: 'ordinal'})}</div>
            <br />
            <button onClick={onToggle}>{t('切换语言')}</button>
        </div>
    );
};

export default HookChild;
