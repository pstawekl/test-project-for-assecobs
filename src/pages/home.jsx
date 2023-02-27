import React, { useState } from "react";
import { ControlsTest } from "../models/controlsTest";

export default function Home() {
    const [listItems, setListItems] = useState([]);
    const [apiUrlStr, setApiUrlStr] = useState("");
    const controlsTest = new ControlsTest();
    let controlsTestModel = controlsTest.controlsTestModel;
    // console.log(controlsTestModel);

    async function responseToApi(event, apiUrl) {
        event.preventDefault();
        await fetch(apiUrl, { method: "GET", mode: "cors" }).then(res => res.json()).then(res => setListItems(res));
    }

    return (
        <div className="Inputs">
            Podaj adres url: <input type="text" placeholder="Adres url..." onChange={(e) => setApiUrlStr(e.target.value)} /> <br />
            <button onClick={(e) => { responseToApi(e, apiUrlStr) }}>Pobierz</button> <br />
            Podaj nazwę: <input type="checkbox" /> <br />
            Lista <br />
            {
                listItems.length > 0 ?
                    listItems
                    :
                    <p>Brak elementów</p>
            }
            {/* listItems.map((item, index) => {
                        return (
                            <div key={index}>
                                <p>{controlsTestModel[index].caption}</p>
                            </div>
                        );
                    }) */}

        </div>
    );
}