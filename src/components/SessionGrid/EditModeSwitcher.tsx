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
import { Tooltip } from '../Tooltip';
import { useEditMode } from './EditModeContext';

export function EditModeSwitcher() {
  const { t } = useTranslation();
  const { canEditGrid, setCanEditGrid } = useEditMode();

  const text = t('sessionGrid.editModeSwitch', 'Edit tracks and time slots');

  return (
    <Tooltip content={text}>
      <Button
        aria-label={text}
        basic
        circular
        compact
        icon="edit"
        toggle
        active={canEditGrid}
        onClick={() => setCanEditGrid((old) => !old)}
      />
    </Tooltip>
  );
}
