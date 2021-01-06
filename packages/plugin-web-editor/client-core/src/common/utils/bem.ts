const namespace = 'gg';

/**
 * BEM生成函数
 * @param B block
 * @param E element
 * @param M Modify
 * @constructor
 */
const BEM = (B?: string, E?: string, M?: string): string => {
  let className = namespace;
  if (B) className += `-${B}`;

  if (E) className += `__${E}`;

  if (M) className += `--${M}`;

  return className;
};

/**
 * state生成函数
 * @param state
 * @constructor
 */
const S = (state: string): string => {
  return `is-${state}`;
};

export { BEM, S };
