import { useState, useEffect } from 'react';
import './App.css';
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';

let initialState =[
  {
    id: 1,
    prioridade: '1',
    titulo: "titulo",
    descricao: "Primeira atividade"
  },
  {
    id: 2,
    prioridade: '3',
    titulo: "titulo",
    descricao: "Segunda atividade"
  }
];

function App() {
  const [index, setIndex] = useState(0);
  const [atividades, setAtividades] = useState(initialState)
  const [atividade, setAtividade] = useState({id: 0})

  useEffect(() => {
    atividades.length <= 0 ? setIndex(1) : 
    setIndex(Math.max.apply(Math, atividades.map(item => item.id)) + 1)
  }, [atividades])

  function addAtividade(ativ){
    setAtividades([...atividades, {...ativ, id: index}]);
  }

  function CancelarAtividade(){
    setAtividade({id: 0})
  }

  function AtualizarAtividade(ativ){
    setAtividades(atividades.map(item => item.id === ativ.id ? ativ : item))
    setAtividade({id: 0})
  }

  function DeletarAtividade(id){
    const atividadesFiltradas = atividades.filter(ativ => ativ.id !== id);
    setAtividades([...atividadesFiltradas])
  }

  function PegarAtividade(id){
    const atividade = atividades.filter(ativ => ativ.id === id);
    setAtividade(atividade[0])
  }

  return (
    <>
      <AtividadeForm
        addAtividade={addAtividade}
        CancelarAtividade={CancelarAtividade}
        AtualizarAtividade={AtualizarAtividade}
        ativSelecionada={atividade}
        atividades={atividades}
       />
      <AtividadeLista
        atividades={atividades}
        DeletarAtividade={DeletarAtividade}
        PegarAtividade={PegarAtividade}
       />
    </>
  );
}

export default App;
