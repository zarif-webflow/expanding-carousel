type NonUndefined<T> = T extends undefined ? never : T;

class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AssertionError';
  }
}

export const assertValue = <T>(value: T, message: string, condition?: (value: T) => boolean) => {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(value) ||
    (condition && !condition(value))
  ) {
    throw new AssertionError(message);
  }
  return value;
};

export const fallback = <T>(
  value: T,
  replacementValue: NonUndefined<T>,
  condition?: (value: T) => boolean
) => {
  if (value !== undefined && condition && !condition(value)) return replacementValue;
  if (value === undefined || Number.isNaN(value)) return replacementValue;
  if (value === 0) return value;

  return value;
};

export const wait = async (delayInMs: number) => new Promise((res) => setTimeout(res, delayInMs));

export const getAssertedHtmlElement = <TElement extends HTMLElement = HTMLElement>(
  selector: string,
  parent?: HTMLElement
) => {
  return assertValue(
    (parent || document).querySelector<TElement>(selector),
    `Element: ${selector} was not found!`
  );
};
export const getAssertedHtmlElements = <TElement extends HTMLElement = HTMLElement>(
  selector: string,
  parent?: HTMLElement
) => {
  const elements = (parent || document).querySelectorAll<TElement>(selector);

  if (elements.length === 0) throw new Error(`Element: ${selector} was not found!`);

  return Array.from(elements);
};

export const setStyle = <TElement extends HTMLElement = HTMLElement>(
  element: TElement,
  styles: Record<string, string>
): { revert: () => void } => {
  const prevValues: typeof styles = {};

  for (const key of Object.keys(styles)) {
    prevValues[key] = element.style.getPropertyValue(key);
    element.style.setProperty(key, styles[key] || null);
  }

  return {
    revert: () => {
      Object.assign(element.style, prevValues);
    },
  };
};

export const parseFloatFallback = (inputStr: string | undefined, fallbackValue: number) => {
  if (inputStr === undefined) return fallbackValue;

  const parsedValue = Number.parseFloat(inputStr);

  return Number.isNaN(parsedValue) ? fallbackValue : parsedValue;
};
