/*
 * Copyright 2022 Nordeck IT + Consulting GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { WidgetApi } from '@matrix-widget-toolkit/api';
import {
  SemanticUiThemeProvider,
  SemanticUiWidgetApiProvider,
} from '@matrix-widget-toolkit/semantic-ui';
import { Suspense } from 'react';
import { Layout } from './components/Layout';
import {
  NotificationsProvider,
  useNotifications,
} from './components/NotificationsProvider';
import { StyledComponentsThemeProvider } from './components/StyledComponentsThemeProvider';
import { widgetRegistration } from './lib/registration';
import { generateError, getActionType, StoreProvider } from './store';
import { spaceApi } from './store/api/spaceApi';

export function AppWrapper({
  widgetApiPromise,
}: {
  widgetApiPromise: Promise<WidgetApi>;
}) {
  return (
    // Fallback suspense if no higher one is registered (used for i18n)
    <Suspense fallback={<></>}>
      <SemanticUiThemeProvider>
        <StyledComponentsThemeProvider>
          <NotificationsProvider>
            <SemanticUiWidgetApiProvider
              widgetApiPromise={widgetApiPromise}
              widgetRegistration={widgetRegistration}
            >
              <App />
            </SemanticUiWidgetApiProvider>
          </NotificationsProvider>
        </StyledComponentsThemeProvider>
      </SemanticUiThemeProvider>
    </Suspense>
  );
}

function App() {
  const { showError } = useNotifications();

  return (
    <StoreProvider
      onError={(action) => {
        // Ignore the "NoLobby" error because this error is already handled
        // automatically and we don't need to notify the user about it.
        if (
          spaceApi.endpoints.getLobbyRoom.matchRejected(action) &&
          action.payload?.name === 'NoLobby'
        ) {
          return;
        }

        showError(generateError(action), {
          context: getActionType(action) === 'query' ? 'query' : undefined,
        });
      }}
    >
      <Layout />
    </StoreProvider>
  );
}
