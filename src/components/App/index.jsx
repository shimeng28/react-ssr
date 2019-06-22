import React from 'react';
import PropTypes from 'prop-types';
import Header from 'Components/Header';
import { renderRoutes } from 'react-router-config';
import './index.less';

const App = (props) => {
  const { staticContext, route } = props;
  return (
    <div>
      <Header staticContext={staticContext} />
      {
        renderRoutes(route.routes)
      }
    </div>
  );
};

App.propTypes = {
  staticContext: PropTypes.shape({}),
  route: PropTypes.shape({
    route: PropTypes.array,
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
