import React, { useState } from "react";
import controlTest from './../homework_html/controlsTest.json';
import controlTest2 from './../homework_html/controlsTest2.json';
import controlTestJSONP from './../homework_html/controlsTest.jsonp';
import TableRow from "../components/tableRow";
import './styles/styles.css'
import { saveAs } from "file-saver";

export default function Home() {
    const [listItems, setListItems] = useState({});
    const [apiUrl, setApiUrlStr] = useState("");
    const tempListItem = [{ "controls": {} }];

    function responseToApi(event) {
        event.preventDefault();
        setListItems([])

        async function fetchToApi() {
            //przykładowe użycie funkcji fetch dla podanych linków w zadaniu
            await fetch(apiUrl, { method: "GET", mode: "no-cors" }).then(res => setListItems(res.json()));
        }

        //korzystanie z lokalnych odpowiedników plików json, zawartych w api
        //spowodowane problemami z CORS oraz JSON.parse przy pobieraniu z api
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
            console.log(tempListItem[0]['controls'][i])
        }
        console.log(tempListItem[0]['controls'])

        var blob = new Blob([JSON.stringify(tempListItem)], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "generated_json.json");

        setListItems([]);
        setApiUrlStr('');
    }


    return (
        <div className="Inputs">
            Podaj adres url: <input type="text" id="apiUrl" placeholder="Adres url..." value={apiUrl} onChange={(e) => setApiUrlStr(e.target.value)} /> <br />
            <button onClick={(e) => { responseToApi(e) }}>Pobierz</button> <br />
            <br />
            {
                listItems[0]?.['controls'] !== undefined ?
                    <div className="generated">
                        <h1>Wygenerowane</h1>
                        {
                            listItems[0].controls.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <TableRow listItem={item} />
                                    </div>
                                )
                            })
                        }
                        <br />
                        <button type="submit" className="submit" onClick={(e) => { saveToJSON(e) }}>Zapisz</button>
                    </div>
                    :
                    <p>Brak elementów</p>
            }
        </div>
    );
}