/**
 * @file
 * Main Storybook.js stories
 */

import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

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

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
//
// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));
//

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
  headline: 'New Starter Kit site',
  title: 'New Starter Kit site',
  uuid: 'xxx-xxx-xxx',
  pubdate: new Date('2018-07-25T17:43:37.00Z'),
  buildTime: new Date('2018-07-25T17:43:37.00Z'),
};

// Ads
storiesOf('Ads', module).add('Top ad', () => <TopAd />);
storiesOf('Ads', module).add('Middle ad', () => <MiddleAd />);

// Analytics
storiesOf('Analytics', module).add('default', () => (
  <Fragment>
    <h4>
You won&apos;t see anything here as &quot;Analytics&quot; has no visual output
    </h4>
    <Analytics id={DEFAULT.uuid} flags={DEFAULT.flags} />
  </Fragment>
));

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
storiesOf('HtmlHead', module).add('default', () => (
  <Fragment>
    <h4>
You won&apos;t see anything here as &quot;HtmlHead&quot; has no visual output
    </h4>
    <HtmlHead
      flags={defaultFlags}
      title="Testing <HtmlHead>"
      topic={DEFAULT.topic}
      headline={DEFAULT.headline}
      id={DEFAULT.uuid}
      url={DEFAULT.url}
      buildTime={DEFAULT.buildTime}
    />
  </Fragment>
));
storiesOf('Layout', module).add('default', () => (
  <Layout
    flags={DEFAULT.flags}
    headline={DEFAULT.headline}
    title={DEFAULT.title}
    topic={DEFAULT.topic}
    url={DEFAULT.url}
    publishedDate={DEFAULT.pubdate}
    buildTime={DEFAULT.buildTime}
  >
    <p>
      Lorem ipsum dolor sit amet, esse mediocritatem et eos, ex cum nostrum singulis inciderint.
      Error vitae molestie ea sit, cu usu facilis deleniti, nec ea novum solet. No pro labores
      omnesque, duo ut tractatos accusamus. Usu vitae mollis ut, cetero detraxit cu qui. Et elitr
      dolore praesent est.
    </p>

    <p>
      Ex his oratio perpetua expetendis, commune suscipiantur nec at, vel lorem atqui option ne.
      Habeo congue vel te. Ex quo summo principes. Eu dicta solet molestiae eam, eu ius primis
      consectetuer. Ei dicant numquam omittam qui. Vim dicunt nostrud volutpat ex, cu mel gubergren
      constituto.
    </p>

    <p>
      Ad qui wisi minimum cotidieque, ea vis esse discere intellegam. Et omnium inimicus vim. Ea
      sale dicam homero ius. Impedit eligendi delicata in mel, vis soluta temporibus an, ex vis vide
      laoreet. No per hinc ferri mediocritatem, eam modus ubique atomorum ne. Iudico offendit ut
      his.
    </p>

    <p>
      Mel fastidii eleifend no, ut oratio intellegam cum. Iudico dignissim sadipscing ei mel. At
      laudem legendos erroribus eos. Aliquid dolorem dissentiunt eos cu. Eros suscipiantur mea ei,
      tantas vituperata vis ad. Pri et dicunt regione, ut quando volutpat abhorreant eos.
    </p>

    <p>
      Ad cum saperet docendi, ex habeo nemore euismod vix, usu semper instructior cu. Natum
      salutatus consetetur sit cu. Ad erroribus complectitur vis. Ne possim similique vis. Ne enim
      soluta vix, quis natum ne qui, ei vidit latine partiendo mei. Mel ea duis essent vivendo.
    </p>
  </Layout>
));
storiesOf('OnwardJourney', module).add('default', () => (
  <OnwardJourney
    relatedContent={[{ rows: 2, list: 'thing/adae44ca-4ea7-3cf8-8332-bf85ec89a558' }]}
  />
));
storiesOf('Share', module).add('default', () => <Share url={DEFAULT.url} />);
