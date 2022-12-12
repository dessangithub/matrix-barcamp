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

import { StateEvent } from '@matrix-widget-toolkit/api';
import Joi from 'joi';
import { IWidget } from 'matrix-widget-api';
import { isValidEvent } from './validation';

export const STATE_EVENT_WIDGETS = 'im.vector.modular.widgets';

export type WidgetsEvent = IWidget;

const widgetsEventSchema = Joi.object<WidgetsEvent, true>({
  id: Joi.string().required(),
  creatorUserId: Joi.string().required(),
  name: Joi.string(),
  type: Joi.string().required(),
  url: Joi.string().required(),
  waitForIframeLoad: Joi.boolean(),
  data: Joi.object(),
}).unknown();

export function isValidWidgetsEvent(
  event: StateEvent<unknown>
): event is StateEvent<WidgetsEvent> {
  return isValidEvent(event, STATE_EVENT_WIDGETS, widgetsEventSchema);
}
