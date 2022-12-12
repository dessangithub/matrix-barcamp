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

import { useTranslation } from 'react-i18next';
import { Button } from 'semantic-ui-react';
import { styled } from '../StyledComponentsThemeProvider';
import { Tooltip } from '../Tooltip';

const ButtonWithoutMargin = styled(Button)({
  '&&&&&': {
    margin: 0,
  },
});

export function AddTrackButton({ onAddTrack }: { onAddTrack: () => void }) {
  const { t } = useTranslation();
  const label = t('track.create', 'Create a track');
  return (
    <Tooltip position={'bottom right'} content={label}>
      {/* div is needed to position the tooltip correctly */}
      <div>
        <ButtonWithoutMargin
          icon="plus"
          size="large"
          onClick={onAddTrack}
          aria-label={label}
        />
      </div>
    </Tooltip>
  );
}
