import React, { useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState
} from "react-accessible-accordion";
import "./styles/styles.css";
import 'react-accessible-accordion/dist/fancy-example.css';

export default function TableRow({ listItem }) {
    const [checked, setChecked] = useState(Boolean(listItem.defaultValue));
    const [value, setValue] = useState(listItem.defaultValue);
    const [isActive, setIsActive] = useState(false);

    if (listItem.type === 'LIST') {
        return (<div className="control">
            <div className="list"><h3>{listItem.caption}</h3>
                {listItem.items.map((item, index) => {
                    return (
                        // <li value={item.value} key={item.key}>
                        <div>
                            <Accordion>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            {item.caption}
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>
                                            {item.value}
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                            </Accordion>
                            {/* <button className="accordion" onClick={() => setIsActive(!isActive)}>{item.caption}</button>
                            {isActive && <div className="panel">{item.value}</div>} */}
                        </div>
                        // </li>

                    )
                })}
            </div>
        </div >)
    }
    if (listItem.type === 'TEXT') {
        return (
            <div className="control" key={listItem.key}>
                <label>{listItem.caption}: </label>
                <input name={listItem.key} id={listItem.key} type='text' value={value} onChange={(e) => { setValue(e.target.value) }} />
            </div>
        )
    }
    if (listItem.type === 'CHECKBOX') {
        return (
            <div className="control" key={listItem.key}>
                <input name={listItem.key} id={listItem.key} type='checkbox' checked={checked} onChange={(e) => { setChecked(!checked) }} />
                <label>{listItem.caption}</label>
            </div>
        )
    }

    return null

}