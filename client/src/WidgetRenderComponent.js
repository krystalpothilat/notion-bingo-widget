import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function WidgetRenderComponent() {
    const { widgetId } = useParams();
    const [widgetData, setWidgetData] = useState(null);
    const [htmlContent, setHtmlContent] = useState('');
  
    useEffect(() => {
      const fetchWidgetData = async () => {
        try {
            
          // Fetch widget data based on widgetId from the server
          const response = await fetch(`http://notion-bingo-widget-server.vercel.app/${widgetId}`);
          const data = await response.text(); // Use response.text() for HTML content
            
          // Set the fetched data to the state
          setWidgetData(data);
  
          // Set HTML content
          setHtmlContent(data);
        } catch (error) {
          console.error('Error fetching widget data:', error);
        }
      };
  
      // Call the fetch function
      fetchWidgetData();
  
      console.log('WidgetRenderComponent rendered with widgetId:', widgetId);

    }, [widgetId]); // Trigger the fetch when widgetId changes

    if (!widgetData) {
      // Loading state or handle error
      return <div>Loading...</div>;
    }
  
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}

export default WidgetRenderComponent;
