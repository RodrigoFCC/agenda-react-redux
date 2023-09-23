import { useSelector } from 'react-redux'

import Contato from '../../components/Contato'
import { MainContainer, Titulo } from '../../styles'

import { RootReducer } from '../../store'

const ListaDeContatos = () => {
  const { itens } = useSelector((state: RootReducer) => state.contatos)
  const { termo, criterio } = useSelector((state: RootReducer) => state.filtro)

  const filtracontatos = () => {
    let contatosFiltradas = itens
    if (termo !== undefined) {
      contatosFiltradas = itens.filter(
        (item) => item.nome.toLowerCase().search(termo.toLowerCase()) >= 0
      )

      return contatosFiltradas
    } else {
      return itens
    }
  }

  const exibeResultadoFiltragem = (quantidade: number) => {
    let mensagem = ''
    const complementacao =
      termo !== undefined && termo.length > 0
        ? `
    "${termo}"`
        : ''

    if (criterio === 'todas') {
      mensagem = `Total de ${quantidade} contato(s) encontrado(s): ${complementacao}`
    } else {
      mensagem = `${quantidade} contato(s) encontrado(s) como: ${complementacao}`
    }

    return mensagem
  }

  const contatos = filtracontatos()
  const mensagem = exibeResultadoFiltragem(contatos.length)

  return (
    <MainContainer>
      <Titulo as="p">{mensagem}</Titulo>
      <ul>
        {contatos.map((t) => (
          <li key={t.nome}>
            <Contato
              id={t.id}
              email={t.email}
              nome={t.nome}
              telefone={t.telefone}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeContatos
