import { Radio, Stack, Typography } from "@material-ui/core";
import React from "react";
import { SortMethods } from "../enums/sortMethods";

export interface IMemorizerFiltersProps {
  setter(state: SortMethods): void;
  value: SortMethods;
}

export default function MemorizerFilters(props: IMemorizerFiltersProps) {
  const { setter, value } = props;

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    setter(parseInt(event.currentTarget.value));
  }

  const options: JSX.Element[] = [];
  for (const method in SortMethods) {
    if (method.match(/[0-9]/)) continue;

    const checked = (SortMethods[method] as unknown) === value;

    const option = (
      <Stack key={method} direction='row' alignItems='center'>
        <Typography>{method}</Typography>
        <Radio
          checked={checked}
          onChange={handleChange}
          value={SortMethods[method]}
          name={method}
          inputProps={{ "aria-label": method }}
        />
      </Stack>
    );
    options.push(option);
  }

  return <>{options}</>;
}
