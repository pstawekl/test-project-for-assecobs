import React, { useState } from "react";
import { Accordion, Col, Container, Form, Row } from "react-bootstrap";
import "./styles/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TableRow({ listItem }) {
    const [checked, setChecked] = useState(Boolean(listItem['defaultValue']));
    const [value, setValue] = useState(listItem['defaultValue']);

    if (listItem.type === 'LIST') {
        return (
            <Container className="control" style={{ marginLeft: '11px' }}>
                <Row>
                    <p>{listItem.caption}:</p>
                    <Col>
                        {listItem.items.map((item, index) => {
                            return (
                                <Accordion>
                                    <Accordion.Item eventKey="0" key={listItem.key}>
                                        <Accordion.Header key={listItem.key}>
                                            {item.caption.match(/.{1,20}/g)[0]}
                                        </Accordion.Header>
                                        <Accordion.Body key={item.value}>
                                            {item.value}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        )
    }
    if (listItem.type === 'TEXT') {
        return (
            <Row>
                <Form.Label column sm={2}>{listItem.caption.match(/.{1,20}/g)[0]}:</Form.Label>
                <Col className="control" key={listItem.key}>
                    <Form.Control column sm={10} type="text" id={listItem.key} value={value}
                        label={listItem.caption + ':'} onChange={(e) => { setValue(e.target.value) }} />
                </Col>
            </Row>
        )
    }
    if (listItem.type === 'CHECKBOX') {
        return (
            <Container>
                <Row>
                    <Col className="control" key={listItem.key}>
                        <Form.Check type="checkbox" id={listItem.key} label={listItem.caption.match(/.{1,20}/g)[0]}
                            checked={checked ? true : false} onChange={(e) => { setChecked(!checked) }} />
                    </Col>
                </Row>
            </Container>
        )
    }

    return null

}