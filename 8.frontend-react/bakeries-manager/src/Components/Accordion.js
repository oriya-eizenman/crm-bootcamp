import React from 'react';
import Collapsible from 'react-collapsible';
import Form from './Form';
import Table from './Table';

export default function Accordion(props) {

    return (
        <div className="accordion">
            {props.cards.map(card =>
                <Collapsible
                    trigger={card.trigger}
                    open={card.open}
                    onOpening={card.onOpening}
                >
                    <div className="cardContent">
                        <Form className="accordionForm" fields={card.formFields} />
                        {card.table &&
                            <div className="App">
                                {card.itemsRef.current.length !== 0 && <Table columns={card.tableColumns} data={card.itemsRef.current} />}
                            </div>
                        }
                    </div>
                </Collapsible>
            )}
        </div>
    );
}