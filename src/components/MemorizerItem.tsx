import { ListItem, ListItemText, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { format } from "date-fns";

export interface IMemorizerItemProps {
  item: IMemorizerStoredItem;
  remover(item: IMemorizerStoredItem): void;
}

export default function MemorizerItem(props: IMemorizerItemProps) {
  const { item, remover } = props;
  const hasSpaces = item.message.includes(" ");

  return (
    <ListItem
      secondaryAction={
        <IconButton
          onClick={() => remover(item)}
          edge='end'
          aria-label='delete'
        >
          <Delete />
        </IconButton>
      }
    >
      <ListItemText
        style={{ lineBreak: hasSpaces ? "normal" : "anywhere" }}
        primary={item.message}
        secondary={format(new Date(item.creation), "d'/'M'/'Y")}
      />
    </ListItem>
  );
}
