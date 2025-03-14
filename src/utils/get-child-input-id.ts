import React from 'react';

export const getChildInputId = (
  children: React.ReactElement<HTMLElement>
): string => {
  const child = React.Children.only(children);

  if (
    React.isValidElement(child) &&
    (child.type === 'input' || child.type === 'select')
  ) {
    return child.props.id;
  } else if (Array.isArray(child.props.children)) {
    for (const element of child.props.children) {
      if (React.isValidElement(element) && element.type === 'input') {
        return (element as React.ReactElement<HTMLInputElement>).props.id;
      }
    }
  }
  return '';
};
