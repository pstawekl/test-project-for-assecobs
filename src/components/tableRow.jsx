import React from "react";

export default function TableRow({ listItem }) {
    const [checked, setChecked] = React.useState(Boolean(listItem.defaultValue));
    if (listItem.type == 'LIST') {
        return (<div>
            <ul key={listItem.key}>{listItem.caption}
                {listItem.items.map((item, index) => {
                    return (
                        <li >{item.caption}</li>
                    )
                    // key={index} value={item.value}
                })}
            </ul>
        </div>)
    }
    if (listItem.type == 'TEXT') {
        return (
            <div className="text" key={listItem.key}>
                <label>{listItem.caption}</label>
                <input type='text' defaultValue={listItem.defaultValue} onChange={(e) => { }} />
            </div>
        )
    }
    if (listItem.type == 'CHECKBOX') {
        console.log('listItem', listItem);
        return (
            <div className="checkbox" key={listItem.key}>
                <input type='checkbox' checked={checked} onChange={(e) => { setChecked(!checked) }} />
                <label>{listItem.caption}</label>
            </div>
        )
    }

    return null

}