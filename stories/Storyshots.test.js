import initStoryshots, { snapshotWithOptions } from '@storybook/addon-storyshots';

initStoryshots({
  test: snapshotWithOptions({
    createNodeMock: (el) => {
      const ref = document.createElement(el.type);
      ref.className = el.props.className;
      ref.setAttribute('data-o-component', el.props['data-o-component']);

      return ref;
    },
  }),
});
