/**
 * @file
 * Main Storybook.js stories
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { storiesOf, addDecorator } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { TopAd, MiddleAd } from '../components/ads';
import Analytics from '../components/analytics';
import ArticleHead from '../components/article-head';
import Comments from '../components/comments';
import Footer from '../components/footer';
import Header from '../components/header';
import HtmlHead from '../components/html-head';
import Layout from '../components/layout';
import OnwardJourney from '../components/onwardjourney';
import Share from '../components/share';
import '../shared/critical-path.scss';

const defaultFlags = {
  prod: false,
  errorReporting: true,
  analytics: false,
  googleAnalytics: false,
  ads: false,
  onwardjourney: true,
  shareButtons: true,
  header: true,
  footer: true,
  comments: true,
  data: false,
};

const DEFAULT = {
  flags: defaultFlags,
  url: 'https://local.ft.com/',
  summary: 'This is a standfirst',
  topic: {
    url: 'https://local.ft.com/',
    name: 'Testing',
  },
  bylines: [{ name: 'Ændrew Rininsland', url: 'https://ft.com/ændrew-rininsland' }],
  image: {
    uuid: 'f07ccec8-7ded-11e8-af48-190d103e32a4',
  },
  headline: text('Headline', 'New Starter Kit site'),
  title: 'New Starter Kit site',
  uuid: 'xxx-xxx-xxx',
  pubdate: new Date('2018-07-25T17:43:37.00Z').toISOString(),
  buildTime: new Date('2018-07-25T17:43:37.00Z').toISOString(),
};

const lorem = `Lorem ipsum dolor sit amet, esse mediocritatem et eos, ex cum nostrum singulis inciderint.
Error vitae molestie ea sit, cu usu facilis deleniti, nec ea novum solet. No pro labores
omnesque, duo ut tractatos accusamus. Usu vitae mollis ut, cetero detraxit cu qui. Et elitr
dolore praesent est.

Ex his oratio perpetua expetendis, commune suscipiantur nec at, vel lorem atqui option ne.
Habeo congue vel te. Ex quo summo principes. Eu dicta solet molestiae eam, eu ius primis
consectetuer. Ei dicant numquam omittam qui. Vim dicunt nostrud volutpat ex, cu mel
gubergren constituto.

Ad qui wisi minimum cotidieque, ea vis esse discere intellegam. Et omnium inimicus vim. Ea
sale dicam homero ius. Impedit eligendi delicata in mel, vis soluta temporibus an, ex vis
vide laoreet. No per hinc ferri mediocritatem, eam modus ubique atomorum ne. Iudico offendit
ut his.

Mel fastidii eleifend no, ut oratio intellegam cum. Iudico dignissim sadipscing ei mel. At
laudem legendos erroribus eos. Aliquid dolorem dissentiunt eos cu. Eros suscipiantur mea ei,
tantas vituperata vis ad. Pri et dicunt regione, ut quando volutpat abhorreant eos.

Ad cum saperet docendi, ex habeo nemore euismod vix, usu semper instructior cu. Natum
salutatus consetetur sit cu. Ad erroribus complectitur vis. Ne possim similique vis. Ne enim
soluta vix, quis natum ne qui, ei vidit latine partiendo mei. Mel ea duis essent vivendo.`;

addDecorator(withKnobs);
addDecorator(withInfo);

// Layout
storiesOf('Layout', module).add(
  'default',
  () => (
    <Layout
      flags={DEFAULT.flags}
      headline={text('Headline', DEFAULT.headline)}
      title={text('Title', DEFAULT.title)}
      topic={DEFAULT.topic}
      url={text('Url', DEFAULT.url)}
      publishedDate={DEFAULT.pubdate}
      buildTime={DEFAULT.buildTime}
    >
      {text('Content', lorem)
        .split(/\n\n/)
        .map((par, idx) => <p key={idx /* eslint-disable-line */}>{par}</p>)}
    </Layout>
  ),
  {
    info: `
    <Layout /> is the primary component you'll work with in Starter Kit.
    All the other components in this story are already included with it, and it's
    the default export of g-components. To use it, you supply it children, which
    get wrapped as the main article body. Make sure to wrap paragraphs in <p> tags
    to maintain typographic styles.
  `,
  },
);

// Ads
storiesOf('Ads', module).add('Top ad', () => <TopAd />);
storiesOf('Ads', module).add('Middle ad', () => <MiddleAd />);

// Analytics
storiesOf('Analytics', module).add(
  'default',
  () => [
    <h4 key="1">
You won&apos;t see anything here as &quot;Analytics&quot; has no visual output
    </h4>,
    <Analytics key="2" id={DEFAULT.uuid} flags={DEFAULT.flags} />,
  ],
  {
    info: `
    The analytics module won't display because it's mainly a behind-the-scenes thing.
    You need to just simply import it whereever.
  `,
  },
);

storiesOf('ArticleHead', module).add('default', () => (
  <ArticleHead
    flags={DEFAULT.flags}
    url={DEFAULT.url}
    headline="Testing <ArticleHead> component"
    summary={DEFAULT.summary}
    mainImage={DEFAULT.image}
    topic={DEFAULT.topic}
    bylines={DEFAULT.bylines}
    publishedDate={DEFAULT.pubdate}
  />
));
storiesOf('Comments', module).add('default', () => <Comments />);
storiesOf('Footer', module).add('default', () => <Footer />);
storiesOf('Header', module).add('default', () => <Header />);
storiesOf('HtmlHead', module).add('default', () => [
  <h4 key="1">
You won&apos;t see anything here as &quot;HtmlHead&quot; has no visual output
  </h4>,
  <HtmlHead
    key="2"
    flags={defaultFlags}
    title="Testing <HtmlHead>"
    topic={DEFAULT.topic}
    headline={DEFAULT.headline}
    id={DEFAULT.uuid}
    url={DEFAULT.url}
    buildTime={DEFAULT.buildTime}
  />,
]);

storiesOf('OnwardJourney', module).add('default', () => (
  <OnwardJourney
    relatedContent={[{ rows: 2, list: 'thing/adae44ca-4ea7-3cf8-8332-bf85ec89a558' }]}
  />
));
storiesOf('Share', module).add('default', () => <Share url={DEFAULT.url} />);
