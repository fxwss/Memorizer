import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RobotoMono from './fonts/RobotoMono-VariableFont_wght.ttf';

function alphabeticSort(words) {
  return words.sort((a, b) => {
    if(a < b) return -1;
    if(a > b) return 1;
    return 0;
  });
}

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Roboto Mono';
    src: url('${RobotoMono}');
  }

  * {
    margin: 0;
    padding: 0;
    font-family: 'Roboto Mono';
  }
`;

const InputWrapper = styled.div`
display: flex;
`;
  const Label = styled.label`
    margin: auto 0 auto 0;
    font-size: 18px;
  `;
  const Input = styled.input`
    flex: 1;
    margin: 0 0 0 16px;
    border: 1px solid #97979763;
    outline: none;
    background-color: #eeeeee;
    height: 32px;
    padding: auto;
    text-align: center;
    transition: all ease .2s;
    font-size: 18px;

    &:focus {
      background-color: white;
    }

  `;
  const Button = styled.button`
    flex: 1;
    width: 100%;
    min-height: 48px;

    border: none;
    outline: none;

    background-color: ${props => props.color || '#6e9ce0'};

    transition: all ease 100ms;

    margin: 0 auto 0 auto;
    cursor: pointer;
    border: 1px solid #9797974d;
    font-size: 18px;

    box-shadow: 0px 0px 16px 1px #0000003a;

    &:active {
      background-color: ${props => props.activeColor || '#3477db'};
    }

    &:disabled {
      background-color: ${props => props.disabledColor || '#ebebeb'};
      cursor: auto;
    }

  `;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
`;
  const ListItem = styled.li`
    height: 48px;
    width: 100%;
    overflow: hidden;
    display: flex;
    cursor: pointer;

    background: ${props => props.selected? '#a3ddee' : '#fcfcfc'};

    &:nth-child(2n) {
      background: ${props => props.selected? '#6dbad1' : '#d9d9d9'};
    }

    & p {
      margin: auto;
      text-align: center;
    }

    transition: all ease 1s;
  `;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 75%;
  min-width: 30%;
  min-height: 0%;
  max-height: 66%;

  margin: auto;

  row-gap: 8px;

  padding: 32px;

  background: #f5f5f5;
`;

const Title = styled.h1`
  margin: 8px 0;
`;

const storage = window.localStorage;

function getStorageItems() {
  const string = storage.getItem('items');
  return JSON.parse(string);
}

function App() {
  const [items, setItems] = useState(getStorageItems() || []);
  const [text, setText] = useState('');
  const [selected, setSelected] = useState([]);

  const addItem = () => {

    if(text === '' || items.includes(text))
      return;

    const newItems = alphabeticSort([...items, text]);
    setItems(newItems);
    setText('');
  }

  function toggleSelect(word) {
    if(selected.includes(word))
      return setSelected(selected.filter(x => x !== word));
    setSelected([...selected, word]);
  }

  function removeItems() {
    setItems(items.filter(x => !selected.includes(x)));
    setSelected([]);
  }

  storage.setItem('items', JSON.stringify(items));

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <Main>

      <Title>📝 Memorizador: </Title>
      <InputWrapper>
        <Label>Texto: </Label>
        <Input placeholder='Digite o que deseja salvar 😁' value={text} onChange={e => setText(e.target.value)}></Input>
      </InputWrapper>
      <Button disabled={text.trim() === ''} color='#82eb90' activeColor='#4bdf5f' onClick={addItem}>Adicionar 😳</Button>
      <Button onClick={_ => removeItems()} disabled={selected.length < 1} disabledColor='#e2d3d3' color='#f19393' activeColor='#df4b4b'>Remover 😢</Button>

      <List>
        {items.map((word) => {
          return <ListItem selected={selected.includes(word)} onClick={_ => toggleSelect(word)} key={uuidv4()}><p>{word}</p></ListItem>
        })}
      </List>

      </Main>
    </Wrapper>
    </>
  );
}


export default App;