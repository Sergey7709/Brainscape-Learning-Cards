import { useState } from 'react'

import { NavLink } from 'react-router-dom'

import { Delete, Play, Redactor } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Table } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import { DeckEditPack } from '@/pages/decks/deck-editPack/deckEditPack.tsx'
import { ModalDeletePack } from '@/pages/decks/deck-modal-delete-pack'
import s from '@/pages/decks/decks.module.scss'
import { useDeletePack } from '@/pages/decks/hooks-and-functions'
import { useEditPack } from '@/pages/decks/hooks-and-functions/useEditPack.ts'
import { useSaveUrlDeck } from '@/pages/pack/hooks'
import { useGetAuthUserMeDataQuery } from '@/service'
import { DeckType } from '@/service/decks/decks.types.ts'

export const DeckRow = (deck: DeckType) => {
  const { data: dataMeId } = useGetAuthUserMeDataQuery()

  const [openModalDelete, setOpenModalDelete] = useState(false)

  const [openEditModal, setOpenEditModal] = useState(false)

  const { utilityDeletePack, isLoading: isLoadingDelete } = useDeletePack(deck.name)

  const { utilityEditPack, isLoading: isLoadingEdit } = useEditPack()

  const saveUrlDeck = useSaveUrlDeck()

  const meDeck = dataMeId?.id === deck?.userId

  const updatedDateFormat = new Date(deck.updated)
    .toISOString()
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('.')

  const handlerOpenModal = () => {
    setOpenModalDelete(!openModalDelete)
  }

  const handlerDeletePack = () => {
    utilityDeletePack(deck.id)
    setOpenModalDelete(!openModalDelete)
  }

  const handlerEditModal = () => {
    setOpenEditModal(!openEditModal)
  }

  // console.log('cover', deck.cover, 'isFetching', isFetching)

  return (
    <>
      <tr>
        <td>{(isLoadingDelete || isLoadingEdit) && <Loader />}</td>
      </tr>
      {deck && (
        <Table.Row key={deck.id}>
          <Table.Cell>
            <Button
              as={NavLink}
              variant={'link'}
              to={`/pack/${deck.id}`}
              className={s.linkCell}
              onClick={saveUrlDeck}
              fullWidth
            >
              <div className={s.nameContainer}>
                {/*{deck.cover && <img className={s.imgCover} src={deck.cover} />}*/}
                {deck.cover && <img key={deck.cover} className={s.imgCover} src={deck.cover} />}
                {/*{<img className={s.imgCover} src={deck.cover} />}*/}
                {/*<img className={s.imgCover} src={`${deck.cover}?${new Date().getTime()}`} />*/}
                <p className={s.textForName}> {deck.name}</p>
              </div>
            </Button>
          </Table.Cell>
          <Table.Cell>{deck.cardsCount}</Table.Cell>
          <Table.Cell>{updatedDateFormat}</Table.Cell>
          <Table.Cell>
            <Typography>{deck.author.name}</Typography>
          </Table.Cell>
          <Table.Cell>
            <div className={s.buttonContainer}>
              <Button
                variant={'link'}
                as={NavLink}
                to={`/learn/${deck.id}`}
                className={deck.cardsCount > 0 ? s.buttonRow : s.disabledButtonRow}
                onClick={saveUrlDeck}
              >
                <Play />
              </Button>
              {meDeck && (
                <>
                  <Button variant="link" className={s.buttonRow} onClick={handlerEditModal}>
                    <Redactor />
                  </Button>
                  <Button variant="link" className={s.buttonRow} onClick={handlerOpenModal}>
                    <Delete />
                  </Button>
                </>
              )}
            </div>
          </Table.Cell>
        </Table.Row>
      )}
      <tr className={s.modalRow}>
        <td>
          <ModalDeletePack
            open={openModalDelete}
            setOpen={setOpenModalDelete}
            handlerClosedModal={handlerOpenModal}
            handlerDeletePack={handlerDeletePack}
          />
          <DeckEditPack
            id={deck.id}
            coverPack={deck.cover}
            titlePack={deck.name}
            open={openEditModal}
            setOpen={setOpenEditModal}
            isPrivate={deck.isPrivate}
            utilityEditPack={utilityEditPack}
          />
        </td>
      </tr>
    </>
  )
}
