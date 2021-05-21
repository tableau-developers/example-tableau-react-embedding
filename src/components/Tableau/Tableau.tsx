import React, { useEffect, useRef } from 'react';

// Props are pulled from the Viz class constructor
// https://help.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#viz_class
export interface TableauProps {
  parentElement: HTMLElement;
  url: string;
  options?: any;
}

const Tableau: React.FC<TableauProps> = ({ parentElement, url, options = {} }) => {

  // We want to use a ref here to avoid having the viz
  // re-render every single time a parent component
  // re-renders.
  const viz = useRef(null);

  // Make sure we only instantiate the viz once
  useEffect(() => {
    if (!viz.current) {
      viz.current = new window.tableau.Viz(parentElement, url, options);
    }
  }, [])

  return null;
}

export default Tableau;