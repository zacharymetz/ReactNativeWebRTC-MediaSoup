/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/app/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('app renders without error', () => {
  renderer.create(<App />);
});
