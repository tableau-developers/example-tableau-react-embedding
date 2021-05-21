import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Tableau } from './components';

// Import the Tableau JS API lib
import './static/js/tableau-2.8.1.min.js';

// Using the any type as a placeholder here. For a prod application,
// you would want to find/build types for the windown.tableau object
declare global {
  interface Window { tableau: any }
}

const App: React.FC = () => {

  // State var tells us when the DOM has successfully loaded. If
  // the div with id of "tableauViz" hasn't loaded, our viz will
  // end up loading at the bottom of the DOM.
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    // Once the component has loaded, we are ready to load our viz.
    setReady(true);
  }, [])

  return (
    <div id="tableauViz">
      {ready ?
        // If ready, load the viz
        <Tableau 
        parentElement={document.getElementById('tableauViz')!} 
        url='https://public.tableau.com/views/Superstore_15747782479110/Overview?:language=en&:display_count=y&:origin=viz_share_link' 
        options={{
          width: '1000px',
          height: '800px',
          onFirstInteractive: (e: any) => console.log('Viz loaded!', e)
        }}
      /> :
      // Otherwise, return nothing
      null
      }
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));