# react-intl-lite
一种简单的react系统国际化方案

## 使用

### 一、安装相关依赖
```bash
# npm
npm install react-intl-lite --save

# yarn
yarn add react-intl-lite
```

### 二、使用Intl provider

`withIntlProvider(messages [, options])`:

#### 中英文
用`withIntlProvider`封装最顶层的父组件：
```js
import {withIntlProvider} from 'react-intl-lite';
import messages from './path/to/locale/[en-US|zh-CN|zh-TW].messages'; // 项目中定义的语言包
import App from './path/to/App';

export default withIntlProvider(messages)(App);
```
封装后的组件可接受一个`language`属性，值可为`zh-CN`或`en-US`；
language属性变化时可实现在不刷新页面的情况下切换app的语言，如：
```js
<IntlApp language={...} />
```

#### 多语言
```js
import {withIntlProvider} from 'react-intl-lite';
import enMessages from './path/to/en-US.messages'; // 项目中定义的语言包
import koMessages from './path/to/ko-KR.messages'; // 项目中定义的语言包
import App from './path/to/App';

const messages = [
	{language: 'en-US', messages: enMessages},
	{language: 'ko-KR', messages: koMessages},
];

const options = {
    fallback: 'en-US',
};

export default withIntlProvider(messages, options)(App);
```

注：
1. 语言优先级：language属性 > fallback > 浏览器语言 > locales中的第一种语言
2. 中文message文件会自动生成，不需要传入

### 三、子组件中国际化
使用`withIntl`（hoc）或`useIntl`（hook）注入`t、tx`两个主要方法

#### 1.`t(text [, values])`
注：t可理解为text或translate
```js
// hoc方式
import {withIntl} from 'react-intl-lite';

const Demo = ({t}) => (
	<div>
		{t('国际化')} // Internationalization

		{t('你好，{name}', {name: 'Allen'})} // Hi, Allen

		{t('我有{num}只大象', {num: 1})} // I have 1 elephant
		{t('我有{num}只大象', {num: 2})} // I have 2 elephants
	</div>
);

export default withIntl(Demo);

// hook方式
import {useIntl} from 'react-intl-lite';

const Demo = () => {
    const {t} = useIntl();

    return (
        <div>
    		{t('国际化')} // Internationalization

    		{t('你好，{name}', {name: 'Allen'})} // Hi, Allen

    		{t('我有{num}只大象', {num: 1})} // I have 1 elephant
    		{t('我有{num}只大象', {num: 2})} // I have 2 elephants
    	</div>
    );
};

export default Demo;
```

在message文件中添加文案
```js
/* @file messages.js */
export default {
	'国际化': 'Internationalization',
	'你好，{name}': 'Hi, {name}',
	'我有{num}只大象': 'I have {num} {num, plural, one {elephant} other {elephants}}'
};
```

#### 2. `tx(type, value [, options])`

 - type：可选值有`date、time、relactive、number、plural`
 - value和options用法同[react-intl中的formatDate等](https://github.com/yahoo/react-intl/wiki/API#formatdate)

```js
tx('date', Date.now()) // 1/16/2019
tx('time', Date.now()) // 8:16 PM
tx('relative', Date.now() - 6000) // 6 seconds ago
tx('number', 2000) // 2,000
tx('plural', 2) // two
```

### 四、特殊情况
可能存在某个中文文案在系统中对应多个英文文案的场景。如："成员"一词，在系统各处需要翻译为"Member"、"member"、"Members"等，此时可使用【文案+key】指定唯一文案

```js
// 组件内
t(['成员', 'default']);
t(['成员', 'uppercase']);
t(['成员', 'lowercase']);
t(['成员', 'plural']);

// messages.js
export default {
	这是一个标题: 'This is a title',
	成员: {
		default: 'Member',
		uppercase: 'MEMBER',
		lowercase: 'member',
		plural: 'Members'
	}
};
```

## 开发
```bash
yarn install

yarn start
```