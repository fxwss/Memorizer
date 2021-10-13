import { Box, List, Divider } from "@material-ui/core";
import { Fragment } from "react";
import { SortMethods } from "../enums/sortMethods";
import sortByKey from "../utils/sortByKey";
import MemorizerItem from "./MemorizerItem";

function sort(items: IMemorizerStoredItem[], method: SortMethods) {
  switch (method) {
    case SortMethods.Alphabetic:
      return sortByKey<IMemorizerStoredItem>(items, "message");
    case SortMethods.Creation:
      return sortByKey<IMemorizerStoredItem>(items, "creation");
    default:
      return sortByKey<IMemorizerStoredItem>(items, "message");
  }
}

export interface IMemorizerListProps {
  items: IMemorizerStoredItem[];
  remover(item: IMemorizerStoredItem): void;
  sortMethod: SortMethods;
}

export default function MemorizerList(props: IMemorizerListProps) {
  const { items, remover, sortMethod } = props;
  const last = items[items.length - 1];

  if (items.length === 0) return <></>;

  return (
    <Box overflow='auto' border={1} borderColor='divider' borderRadius={1}>
      <List disablePadding>
        {sort(items, sortMethod).map((item) => (
          <Fragment key={item.creation}>
            <MemorizerItem remover={remover} item={item} />
            {item !== last && <Divider flexItem />}
          </Fragment>
        ))}
      </List>
    </Box>
  );
}
