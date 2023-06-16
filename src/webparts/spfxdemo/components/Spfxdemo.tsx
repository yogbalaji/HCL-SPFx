import * as React from "react";
import { ISpfxdemoProps } from "./ISpfxdemoProps";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItemAddResult } from "@pnp/sp/items";

const Spfxdemo = (props: ISpfxdemoProps) => {
  const [listData, setListData] = React.useState([]);
  const [title, setTitle] = React.useState("");

  const fetchData = async () => {
    const sp = spfi().using(SPFx(props.context));
    const items: any[] = await sp.web.lists.getByTitle("Test").items();
    setListData(items);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const submitData = async () => {
    const sp = spfi().using(SPFx(props.context));
    const iar: IItemAddResult = await sp.web.lists
      .getByTitle("Test")
      .items.add({
        Title: title,
      });
    const updatedItems: any[] = await sp.web.lists.getByTitle("Test").items();
    setTitle("");
    setListData(updatedItems);
  };

  return (
    <>
      <div>
        {listData.map((item) => (
          <div>{item.Title}</div>
        ))}
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="button" className="btn btn-primary" onClick={submitData}>
        Submit
      </button>
    </>
  );
};

export default Spfxdemo;
