import React, { useState } from "react";
import controlTest from './../homework_html/controlsTest.json';
import controlTest2 from './../homework_html/controlsTest2.json';
import controlTestJSONP from './../homework_html/controlsTest.jsonp';
import TableRow from "../components/tableRow";
import './styles/styles.css'
import { saveAs } from "file-saver";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    const [listItems, setListItems] = useState({});
    const [apiUrl, setApiUrlStr] = useState("");
    const [jsonBody, setJsonBody] = useState(undefined);
    const tempListItem = [{ "controls": {} }];

    function responseToApi(event) {
        event.preventDefault();
        setListItems([]);
        setJsonBody(undefined);

        //poprawne wywołanie metody GET poprzez funkcję fetch
        //w przypadku poprawnego działania CORS w api pobierze odpowiedni plik json
        async function getFromApi() {

            await fetch(apiUrl, { method: "GET", mode: "cors", credentials: 'same-origin' }).then(res => setListItems(res.json())).then(res => setListItems(res));
            console.log(listItems);
        }
        getFromApi();

        //korzystanie z lokalnych odpowiedników plików json, zawartych w api
        //spowodowane problemami z CORS oraz JSON.parse przy pobieraniu z api
        //problemy udokumentowane zrzutami ekranu w folderze projektu
        if (apiUrl === 'https://erpdemocloud.assecobs.pl/v100/homework_html/controlsTest.json') {
            setListItems([controlTest]);
        } else if (apiUrl === 'https://erpdemocloud.assecobs.pl/v100/homework_html/controlsTest2.json') {
            setListItems([controlTest2]);
        } else if (apiUrl === 'https://erpdemocloud.assecobs.pl/v100/homework_html/controlsTest.jsonp') {
            setListItems([controlTestJSONP]);
        } else if (apiUrl === '') {
            setListItems([]);
            alert('Brak adresu url');
        } else {
            setListItems([]);
            alert('Nieprawidłowy adres url');
        }
    }

    function saveToJSON(event) {
        event.preventDefault();

        //poprawne wywołanie metody POST poprzez funkcję fetch
        //w przypadku poprawnego działania CORS w api edytuje odpowiedni plik json 
        //na podstawie danych wprowadzonych przez użytkownika w kontrolkach
        async function updateInApi() {
            await fetch("...", {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(listItems)
            })
        }

        updateInApi();

        for (let i in listItems[0].controls) {
            if (listItems[0].controls[i].type === 'LIST') {
                tempListItem[0]['controls'][i] = {
                    "type": listItems[0].controls[i].type,
                    "caption": listItems[0].controls[i].caption,
                    "key": listItems[0].controls[i].key,
                    "defaultValue": listItems[0].controls[i].defaultValue,
                    "items": listItems[0].controls[i].items

                }
            } else if (listItems[0].controls[i].type === 'TEXT') {
                tempListItem[0]['controls'][i] = {
                    "type": listItems[0].controls[i].type,
                    "caption": listItems[0].controls[i].caption,
                    "key": listItems[0].controls[i].key,
                    "defaultValue": (document.getElementById(listItems[0].controls[i].key)).value
                }
            } else if (listItems[0].controls[i].type === 'CHECKBOX') {
                tempListItem[0]['controls'][i] = {
                    "type": listItems[0].controls[i].type,
                    "caption": listItems[0].controls[i].caption,
                    "key": listItems[0].controls[i].key,
                    "defaultValue": (document.getElementById(listItems[0].controls[i].key)).checked
                }
            }
        }
        setJsonBody(JSON.stringify(tempListItem[0]['controls']));

        var blob = new Blob([JSON.stringify(tempListItem[0]['controls'])], { type: "text/plain;charset=utf-8" });
        let curDT = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' })
        let dtReplaced = curDT.split('.')[2].split(',')[0] + curDT.split('.')[1] + curDT.split('.')[0] + curDT.split(', ')[1].replace(":", "").replace(":", "");
        console.log(dtReplaced);
        if (apiUrl === 'https://erpdemocloud.assecobs.pl/v100/homework_html/controlsTest.json') {
            saveAs(blob, "controlTest_" + dtReplaced + ".out.json");
        } else if (apiUrl === 'https://erpdemocloud.assecobs.pl/v100/homework_html/controlsTest2.json') {
            saveAs(blob, "controlTest2_" + dtReplaced + ".out.json");
        } else if (apiUrl === 'https://erpdemocloud.assecobs.pl/v100/homework_html/controlsTest.jsonp') {
            saveAs(blob, "controlTest_" + dtReplaced + ".out.jsonp");
        } else if (apiUrl === 'https://erpdemocloud.assecobs.pl/v100/homework_html/controlsTest2.jsonp') {
            saveAs(blob, "controlTest2_" + dtReplaced + ".out.jsonp");
        }

        setListItems([]);
        setApiUrlStr('');
    }


    return (
        <Container className="Inputs" fluid>
            <Row>
                <Col>
                    <Form>
                        <Form.Control type="text" id="apiUrl" placeholder="Podaj adres url..." value={apiUrl} onChange={(e) => setApiUrlStr(e.target.value.replace(" ", ''))}></Form.Control>
                        <Button variant="primary" type="submit" onClick={(e) => { responseToApi(e) }}>Pobierz</Button> <br />
                    </Form>
                    <br />
                    {
                        listItems[0]?.['controls'] !== undefined ?
                            <Container className="generated">
                                <h1>Wygenerowane</h1>
                                {
                                    listItems[0].controls.map((item, index) => {
                                        return (
                                            <Container key={index}>
                                                <TableRow listItem={item} />
                                            </Container>
                                        )
                                    })
                                }
                                <br />
                                <Button variant="primary" type="submit" onClick={(e) => { saveToJSON(e) }}>Zapisz</Button>
                            </Container>
                            :
                            jsonBody !== undefined ?
                                <Container className="generated">
                                    {jsonBody}
                                </Container>
                                :
                                <p>Brak elementów</p>

                    }
                </Col>
            </Row>
        </Container>
    );
}