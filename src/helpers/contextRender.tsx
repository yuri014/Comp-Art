import React, { Context } from 'react';
import { render, RenderResult } from '@testing-library/react';

const customRender = (
  ContextNode: Context<unknown>,
  ui: React.ReactNode,
  providerProps: { value: { [key: string]: unknown } },
): RenderResult<
  typeof import('@testing-library/dom/types/queries'),
  HTMLElement
> =>
  render(<ContextNode.Provider {...providerProps}>{ui}</ContextNode.Provider>);

export default customRender;
