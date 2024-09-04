import React from "react";
import "./styles/WidgetCard.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';


function WidgetCard({title}) {

    return (
        <Card className = "widget-card">
        <Card.Body>{title}</Card.Body>
      </Card>
    );
}

export default WidgetCard;
