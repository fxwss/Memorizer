import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@material-ui/core";

import { Add, GitHub, Sort } from "@material-ui/icons";
import { useLocalStorage } from "react-use";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { SortMethods } from "./enums/sortMethods";

import MemorizerList from "./components/MemorizerList";
import MemorizerFilters from "./components/MemorizerFilters";

interface IFormFields {
  message: string;
}

export default function Memorizer() {
  const [items, setItems] = useLocalStorage<IMemorizerStoredItem[]>(
    "items",
    []
  );
  const { handleSubmit, control, setValue } = useForm<IFormFields>();
  const [sortMethod, setSortMethod] = useState<SortMethods>(
    SortMethods.Alphabetic
  );

  if (!items) return <></>;

  function onSubmit(values: IFormFields) {
    if (!items) return;

    const { message } = values;
    const creation = Date.now();

    const item: IMemorizerStoredItem = { message, creation };

    setItems([...items, item]);
    setValue("message", "");
  }

  const remover = (item: IMemorizerStoredItem) =>
    setItems(items.filter((i) => i !== item));

  return (
    <Stack
      height='100vh'
      width='100vw'
      alignItems='center'
      justifyContent='center'
      padding={{ xs: 0, md: 4 }}
    >
      <Stack
        border={1}
        borderColor='divider'
        borderRadius={1}
        width={{ xs: "100%", md: "66%", lg: "50%" }}
        maxHeight={{ xs: "100vh", md: "98vh" }}
        padding={2}
        component='form'
        direction='column'
        spacing={4}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Header */}
        <Stack
          direction='row'
          justifyContent='space-between'
          spacing={{ xs: 4, md: 0 }}
          alignItems='center'
        >
          <Typography variant='h3'>📝 Memorizer</Typography>
          <Link
            textAlign='center'
            color='text.primary'
            href='https://github.com/Lusqueta/Memorizer'
            target='_blank'
          >
            <GitHub fontSize='large' />
          </Link>
        </Stack>

        {/* Inputs */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
          <Box flex={1}>
            <Controller
              name='message'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Type something cool 🤠'
                  name='message'
                  variant='outlined'
                  fullWidth
                />
              )}
            />
          </Box>
          <Button type='submit' variant='contained' color='success'>
            <Add />
          </Button>
        </Stack>

        {/* Filters */}
        <Stack direction='row' spacing={2} alignItems='flex-end'>
          <Typography>
            <Sort />
          </Typography>
          <MemorizerFilters value={sortMethod} setter={setSortMethod} />
        </Stack>

        {/* List */}
        <MemorizerList
          sortMethod={sortMethod}
          items={items}
          remover={remover}
        />
      </Stack>
    </Stack>
  );
}
