/**
 * @file 国际化组件Demo
 */
import {useState, useCallback} from 'react';
import {withIntlProvider} from 'react-intl-lite';
import messages from '../messages/en-US.messages';
import HookChildRaw from './HookChild';
import HocChildRaw from './HocChild';
import './styles.css';

const IntlWrapper = com =>  withIntlProvider(messages)(com);

const Controller = ({Com}) => {
    const [lang, setLang] = useState('zh-CN');

    const onToggle = useCallback(
        () => {
            setLang(lang === 'zh-CN' ? 'en-US' : 'zh-CN');
        },
        [lang]
    );

    return (
        <Com language={lang} onToggle={onToggle} />
    );
};

const HocChild =IntlWrapper(HocChildRaw);
const HookChild = IntlWrapper(HookChildRaw);

const App = () => {
    return (
        <div className="root">
            <Controller Com={HocChild} />
            <Controller Com={HookChild} />
        </div>
    );
};

export default App;
