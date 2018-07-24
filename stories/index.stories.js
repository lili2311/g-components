/**
 * @file
 * Main Storybook.js stories
 */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

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
storiesOf('Ads', module).add('Top ad', () => <TopAd />);
storiesOf('Ads', module).add('Middle ad', () => <MiddleAd />);
storiesOf('Analytics', module).add('default', () => <Analytics />);
storiesOf('ArticleHead', module).add('default', () => <ArticleHead />);
storiesOf('Comments', module).add('default', () => <Comments />);
storiesOf('Footer', module).add('default', () => <Footer />);
storiesOf('Header', module).add('default', () => <Header />);
storiesOf('HtmlHead', module).add('default', () => <HtmlHead />);
storiesOf('Layout', module).add('default', () => <Layout />);
storiesOf('OnwardJourney', module).add('default', () => <OnwardJourney />);
storiesOf('Share', module).add('default', () => <Share />);
