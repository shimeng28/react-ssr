import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Header from '../Header';
import './index.less';

function App(props) {
  const { staticContext, route } = props;
  return (
    <div>
      <Header staticContext={staticContext} />
      {
        renderRoutes(route.routes)
      }
    </div>
  );
}

App.propTypes = {
  staticContext: PropTypes.shape({}),
  route: PropTypes.shape({
    routes: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
      component: PropTypes.func,
      exact: PropTypes.bool,
      key: PropTypes.string.isRequired,
    })),
  }),
};

App.defaultProps = {
  staticContext: null,
  route: {
    route: [],
  },
};

// export default withStyle(App, styles);
export default App;
