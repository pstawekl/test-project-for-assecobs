import React, { useState } from "react";
import controlTest from './../homework_html/controlsTest.json';
import controlTest2 from './../homework_html/controlsTest2.json';
import controlTestJSONP from './../homework_html/controlsTest.jsonp';
import TableRow from "../components/tableRow";

export default function Home() {
    const [listItems, setListItems] = useState({});
    const [apiUrlStr, setApiUrlStr] = useState("");

    function responseToApi(event, apiUrl) {
        event.preventDefault();

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
            alert('Brak adresu url');
        } else {
            alert('Nieprawidłowy adres url');
        }
    }


    return (
        <div className="Inputs">
            Podaj adres url: <input type="text" placeholder="Adres url..." onChange={(e) => setApiUrlStr(e.target.value)} /> <br />
            <button onClick={(e) => { responseToApi(e, apiUrlStr) }}>Pobierz</button> <br />
            <br />
            {
                listItems[0]?.['controls'] != undefined ?
                    <p>{listItems[0].controls.map((item, index) => {
                        console.log(item)
                        return (
                            <div key={index}>
                                <TableRow listItem={item} />
                            </div>
                        )
                    })}</p>
                    :
                    <p>Brak elementów</p>
            }

        </div>
    );
}