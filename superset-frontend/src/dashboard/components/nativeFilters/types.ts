/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
export interface Column {
  name: string;
  displayName?: string;
}

export interface Scope {
  rootPath: string[];
  excluded: string[];
}

/** The target of a filter is the datasource/column being filtered */
export interface Target {
  datasetId: number;
  column: Column;
}

export type FilterType = 'text' | 'date';

/**
 * This is a filter configuration object, stored in the dashboard's json metadata.
 * The values here do not reflect the current state of the filter.
 */
export interface Filter {
  id: string; // randomly generated at filter creation
  name: string;
  type: FilterType;
  // for now there will only ever be one target
  targets: Target[];
  defaultValue: string[] | number[] | null;
  scope: Scope;
  isInstant: boolean;

  // maybe someday support this?
  // displayColumnsInOptions: Column[];
}

/** Current state of the filter, stored in `nativeFilters` in redux */
export type FilterState = {
  id: string; // ties this filter state to the config object
  optionsStatus: 'loading' | 'success' | 'fail';
  options: string[] | null;
  selectedValues: string[] | null;
  /**
   * If the config changes, the current options/values may no longer be valid.
   * isDirty indicates that state.
   */
  isDirty: boolean;
};