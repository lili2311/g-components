### g-components

React 16.x-based components for Interactive Graphics Starter Kit projects.

### Currently includes:

#### Starter Kit page furniture ported from Nunjucks

- [`<TopAd />`, `<MiddleAd />`][ads] -- Ad slots
- [`<Analytics />`][analytics] -- Analytics tracking
- [`<ArticleHead />`][articlehead] -- Article topper
- [`<Comments />`][comments] -- Comments section
- [`<Footer />`][footer] -- Page footer
- [`<Header />`][header] -- Page header
- [`<HtmlHead />`][htmlhead] -- HTML document structure
- [`<Layout />`][layout] -- Container component composed of all these
- [`<OnwardJourney />`][oj] -- Onward Journey section
- [`<Share />`][share] -- Sharing links

### Usage:

1.  Install from npm

```bash
$ npm install @Financial-Times/g-components
```

2.  Import

```js
import Layout from '@Financial-Times/g-components';
```

3.  Use

```jsx
const MyPage = ({ content, ...props }) => <Layout {...props}>{content}</Layout>;
```

N.b., your content should be a child of `<Layout>`!

[ads]: https://github.com/Financial-Times/g-components/blob/master/components/ads.js
[analytics]: https://github.com/Financial-Times/g-components/blob/master/components/analytics.js
[articlehead]: https://github.com/Financial-Times/g-components/blob/master/components/article-head.js
[comments]: https://github.com/Financial-Times/g-components/blob/master/components/comments.js
[footer]: https://github.com/Financial-Times/g-components/blob/master/components/footer.js
[header]: https://github.com/Financial-Times/g-components/blob/master/components/header.js
[htmlhead]: https://github.com/Financial-Times/g-components/blob/master/components/html-head.js
[layout]: https://github.com/Financial-Times/g-components/blob/master/components/layout.js
[oj]: https://github.com/Financial-Times/g-components/blob/master/components/onwardjourney.js
[share]: https://github.com/Financial-Times/g-components/blob/master/components/share.js
